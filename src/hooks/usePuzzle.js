import { useState, useEffect, useCallback } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { getPuzzle, getUserScore } from "../graphql/queries";
import { createUserScore, updateUserScore, deleteUserScore } from "../graphql/mutations";
import { saveLocalScore, getLocalScore, clearLocalScore } from "../utils/localScore";
import { ADMIN_EMAILS } from "../components/AdminPanel";
import { getNextDay, getPrevDay, getESTDateTime } from "../utils/dateUtils";
import { calculateDistance, generateRandomPointInRadius } from "../utils/geoUtils";
import { GAME_CONFIG } from "../constants/gameConfig";

export const usePuzzle = (puzzleDate, currentUser) => {
  const [puzzleData, setPuzzleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guess, setGuess] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [hintActive, setHintActive] = useState(false);
  const [randomHintCenter, setRandomHintCenter] = useState(null);
  const [revealedLocation, setRevealedLocation] = useState(null);
  const [guessCount, setGuessCount] = useState(0);
  const [userScore, setUserScore] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showShareMessage, setShowShareMessage] = useState(false);
  const [nextDayStr, setNextDayStr] = useState('');
  const [prevDayStr, setPrevDayStr] = useState('');

  useEffect(() => {
    setNextDayStr(getNextDay(puzzleDate));
    setPrevDayStr(getPrevDay(puzzleDate));
  }, [puzzleDate]);

  const isPuzzleAvailable = useCallback(() => {
    if (currentUser?.attributes?.email && ADMIN_EMAILS.includes(currentUser.attributes.email)) {
      return true;
    }

    const estNow = getESTDateTime();
    const puzzleDateObj = new Date(puzzleDate + "T00:00:00");
    puzzleDateObj.setHours(0, 0, 0, 0);
    
    return estNow >= puzzleDateObj;
  }, [puzzleDate, currentUser]);

  const handleLocationSelected = (location) => {
    setGuess(location);
  };

  const handleSubmitGuess = async () => {
    if (!guess || !puzzleData) return;

    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    const distance = calculateDistance(
      guess.lat,
      guess.lng,
      puzzleData.actualLat,
      puzzleData.actualLng
    );

    if (distance <= GAME_CONFIG.GUESS_THRESHOLD_METERS) {
      setResultMessage("Correct guess!");
      setRevealedLocation({ lat: puzzleData.actualLat, lng: puzzleData.actualLng });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), GAME_CONFIG.CONFETTI_DURATION_MS);
      
      if (currentUser) {
        try {
          const authMode = "AMAZON_COGNITO_USER_POOLS";
          const scoreResult = await API.graphql(
            graphqlOperation(getUserScore, { id: `${currentUser.username}_${puzzleDate}` })
          );
          const timestamp = new Date().toISOString();
          
          if (scoreResult?.data?.getUserScore) {
            await API.graphql(
              graphqlOperation(updateUserScore, {
                input: {
                  id: `${currentUser.username}_${puzzleDate}`,
                  score: newGuessCount,
                  timestamp,
                },
              }),
              { authMode }
            );
          } else {
            await API.graphql(
              graphqlOperation(createUserScore, {
                input: {
                  id: `${currentUser.username}_${puzzleDate}`,
                  userId: currentUser.username,
                  date: puzzleDate,
                  score: newGuessCount,
                  timestamp,
                },
              }),
              { authMode }
            );
          }
          setUserScore(newGuessCount);
        } catch (error) {
          console.error("Error recording score:", error);
          setResultMessage("Error recording score. Check console for details.");
        }
      } else {
        saveLocalScore(puzzleDate, newGuessCount);
        setUserScore(newGuessCount);
      }
    } else {
      setResultMessage("Incorrect guess. Try again!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), GAME_CONFIG.SHAKE_ANIMATION_DURATION_MS);
    }
  };

  const handleClearScore = async () => {
    if (currentUser) {
      try {
        const authMode = "AMAZON_COGNITO_USER_POOLS";
        await API.graphql(
          graphqlOperation(deleteUserScore, { input: { id: `${currentUser.username}_${puzzleDate}` } }),
          { authMode }
        );
        setUserScore(null);
        setResultMessage("Score cleared for this puzzle.");
        setGuessCount(0);
        setRevealedLocation(null);
      } catch (error) {
        console.error("Error clearing score:", error);
      }
    } else {
      clearLocalScore(puzzleDate);
      setUserScore(null);
      setResultMessage("Local score cleared for this puzzle.");
      setGuessCount(0);
      setRevealedLocation(null);
    }
  };

  const handleShare = () => {
    const shareText = `UMD GeoGuesser ${puzzleDate}\nSolved in ${userScore} guess${userScore !== 1 ? 'es' : ''}!\n${window.location.href}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setShowShareMessage(true);
      setTimeout(() => setShowShareMessage(false), GAME_CONFIG.SHARE_MESSAGE_DURATION_MS);
    });
  };

  useEffect(() => {
    const fetchPuzzle = async () => {
      setIsLoading(true);
      try {
        if (!isPuzzleAvailable()) {
          setPuzzleData(null);
          setIsLoading(false);
          return;
        }

        const result = await API.graphql(graphqlOperation(getPuzzle, { id: puzzleDate }));
        if (result?.data?.getPuzzle) {
          setPuzzleData(result.data.getPuzzle);
        } else {
          console.warn("No puzzle found for id", puzzleDate);
          setPuzzleData(null);
        }
      } catch (error) {
        console.error("Error fetching puzzle:", error);
        setPuzzleData(null);
      }
      setIsLoading(false);
    };

    const fetchUserScore = async () => {
      if (currentUser) {
        try {
          const result = await API.graphql(
            graphqlOperation(getUserScore, { id: `${currentUser.username}_${puzzleDate}` })
          );
          if (result?.data?.getUserScore) {
            setUserScore(result.data.getUserScore.score);
          } else {
            setUserScore(null);
          }
        } catch (error) {
          console.error("Error fetching user score:", error);
          setUserScore(null);
        }
      } else {
        const localScore = getLocalScore(puzzleDate);
        if (localScore !== null) {
          setUserScore(localScore);
        }
      }
    };

    fetchPuzzle();
    fetchUserScore();
  }, [puzzleDate, currentUser, isPuzzleAvailable]);

  useEffect(() => {
    if (puzzleData) {
      const { actualLat, actualLng, hintRadius } = puzzleData;
      const randomPoint = generateRandomPointInRadius(actualLat, actualLng, hintRadius * 2);
      setRandomHintCenter(randomPoint);
    }
  }, [puzzleData]);

  return {
    puzzleData,
    isLoading,
    guess,
    resultMessage,
    hintActive,
    randomHintCenter,
    revealedLocation,
    userScore,
    showConfetti,
    isShaking,
    showShareMessage,
    nextDayStr,
    prevDayStr,
    isPuzzleAvailable,
    handleLocationSelected,
    handleSubmitGuess,
    handleClearScore,
    handleShare,
    setHintActive,
  };
}; 