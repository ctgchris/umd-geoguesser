import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getLocalScore } from "../utils/localScore";
import { API, graphqlOperation } from "aws-amplify";
import { listPuzzles, getUserScore } from "../graphql/queries";

const PAGE_SIZE = 10;

const PastPuzzles = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { currentUser } = useAuth();
  const [userScores, setUserScores] = useState({});

  // Function to check if a puzzle is available (after 12:00 AM EST for the puzzle date)
  const isPuzzleAvailable = (puzzleDate) => {
    const now = new Date();
    const estOffset = -5; // EST offset from UTC
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estNow = new Date(utc + (3600000 * estOffset));
    
    const puzzleDateObj = new Date(puzzleDate + "T00:00:00");
    puzzleDateObj.setHours(0, 0, 0, 0);
    
    return estNow >= puzzleDateObj;
  };

  useEffect(() => {
    // Fetch all puzzles using the generated listPuzzles query
    const fetchPuzzles = async () => {
      try {
        const result = await API.graphql(graphqlOperation(listPuzzles));
        const items = result?.data?.listPuzzles?.items;
        if (items) {
          // Filter out future puzzles and sort in reverse chronological order
          const availablePuzzles = items
            .filter(puzzle => isPuzzleAvailable(puzzle.date))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          setPuzzles(availablePuzzles);
        } else {
          console.warn("No puzzles found.");
          setPuzzles([]);
        }
      } catch (error) {
        console.error("Error fetching puzzles:", error);
        setPuzzles([]);
      }
    };

    fetchPuzzles();
  }, []);

  useEffect(() => {
    // For each puzzle, fetch the user's score if signed in, else fetch from local storage
    const fetchUserScores = async () => {
      const scores = {};
      if (currentUser) {
        for (let puzzle of puzzles) {
          try {
            // Note: Ensure the key matches what you used when recording the score
            const scoreResult = await API.graphql(
              graphqlOperation(getUserScore, { id: `${currentUser.username}_${puzzle.id}` })
            );
            if (scoreResult?.data?.getUserScore) {
              scores[puzzle.id] = scoreResult.data.getUserScore.score;
            }
          } catch (error) {
            console.error(`Error fetching score for puzzle ${puzzle.id}:`, error);
          }
        }
        setUserScores(scores);
      } else {
        puzzles.forEach((puzzle) => {
          const localScore = getLocalScore(puzzle.id);
          if (localScore !== null) {
            scores[puzzle.id] = localScore;
          }
        });
        console.log("Fetched local scores:", scores);
        setUserScores(scores);
      }
    };

    if (puzzles.length > 0) {
      fetchUserScores();
    }
  }, [currentUser, puzzles]);

  // Calculate the puzzles to display for the current page
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPuzzles = puzzles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(puzzles.length / PAGE_SIZE);

  const goToPreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Past Puzzles</h2>
      <ul className="space-y-2">
        {currentPuzzles.map((puzzle) => (
          <li
            key={puzzle.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <Link to={`/puzzle/${puzzle.id}`} className="text-blue-600 hover:underline">
              {puzzle.date}
            </Link>
            <div>
              {userScores[puzzle.id] !== undefined ? (
                <span className="text-green-600">
                  Score: {userScores[puzzle.id]} guess{userScores[puzzle.id] !== 1 && "es"}
                </span>
              ) : (
                <span className="text-red-600">Unsolved</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${currentPage === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            &larr; Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            className={`px-4 py-2 rounded ${currentPage >= totalPages - 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default PastPuzzles;
