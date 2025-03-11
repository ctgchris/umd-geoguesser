import React from "react";
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePuzzle } from "../hooks/usePuzzle";
import { useWindowSize } from "../hooks/useWindowSize";
import { GAME_CONFIG } from "../constants/gameConfig";
import MapComponent from "./MapComponent";
import LoadingSpinner from "./LoadingSpinner";
import PuzzleNavigation from "./PuzzleNavigation";
import ScoreDisplay from "./ScoreDisplay";
import PuzzleControls from "./PuzzleControls";
import PuzzleHeader from "./PuzzleHeader";

const PuzzleView = ({ puzzleDate }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const {
    puzzleData,
    isLoading,
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
    setHintActive
  } = usePuzzle(puzzleDate, currentUser);

  const goToNextDay = () => navigate(`/puzzle/${nextDayStr}`);
  const goToPrevDay = () => navigate(`/puzzle/${prevDayStr}`);
  const goBackToAll = () => navigate("/past");
  const toggleHint = () => setHintActive(prev => !prev);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!puzzleData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E21833] to-[#8B0000] m-0 p-0">
        <div className="max-w-4xl mx-auto p-4">
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-8 text-white">
              {!isPuzzleAvailable() 
                ? `Puzzle for ${puzzleDate} will be available at ${puzzleDate} 12:00 AM EST`
                : `No Puzzle for ${puzzleDate}`}
            </h2>
            <PuzzleNavigation
              onNextDay={goToNextDay}
              onPrevDay={goToPrevDay}
              onBackToAll={goBackToAll}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E21833] to-[#8B0000] m-0 p-0">
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          .shake-animation {
            animation: shake ${GAME_CONFIG.SHAKE_ANIMATION_DURATION_MS}ms cubic-bezier(.36,.07,.19,.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in;
          }
        `}
      </style>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={GAME_CONFIG.UMD_COLORS}
          numberOfPieces={GAME_CONFIG.CONFETTI_PIECES}
          recycle={false}
        />
      )}
      <div className="max-w-4xl mx-auto p-4">
        <div className={`bg-white rounded-lg shadow-lg p-6 ${isShaking ? 'shake-animation' : ''}`}>
          <PuzzleHeader
            date={puzzleDate}
            difficulty={puzzleData.difficulty}
          />

          {puzzleData?.imageUrl ? (
            <img
              src={puzzleData.imageUrl}
              alt={puzzleData.imageDescription || `Puzzle for ${puzzleDate}`}
              className="w-auto max-h-[600px] mx-auto mb-4 rounded shadow"
            />
          ) : (
            <p>Image not available. Please check your image URL.</p>
          )}
          
          <MapComponent
            onLocationSelected={handleLocationSelected}
            hintVisible={hintActive}
            hintCenter={randomHintCenter}
            hintRadius={puzzleData?.hintRadius * 2}
            correctLocation={revealedLocation}
          />

          <PuzzleControls
            onToggleHint={toggleHint}
            hintActive={hintActive}
            onSubmitGuess={handleSubmitGuess}
            onClearScore={handleClearScore}
            userScore={userScore}
          />

          <PuzzleNavigation
            onNextDay={goToNextDay}
            onPrevDay={goToPrevDay}
            onBackToAll={goBackToAll}
          />

          {resultMessage && (
            <div className={`mt-4 p-4 rounded-lg text-center ${
              resultMessage.includes("Correct") 
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}>
              <p className="text-xl font-semibold">{resultMessage}</p>
            </div>
          )}

          {userScore !== null && (
            <ScoreDisplay
              userScore={userScore}
              onShare={handleShare}
              showShareMessage={showShareMessage}
              currentUser={currentUser}
              revealedLocation={revealedLocation}
              puzzleData={puzzleData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

PuzzleView.propTypes = {
  puzzleDate: PropTypes.string.isRequired,
};

export default PuzzleView;
