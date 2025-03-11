import React from 'react';

const PuzzleControls = ({ onToggleHint, hintActive, onSubmitGuess, onClearScore, userScore }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      <button
        onClick={onToggleHint}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-sm"
      >
        {hintActive ? "Hide Hint" : "Show Hint"}
      </button>
      <button
        onClick={onSubmitGuess}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm"
      >
        Submit Guess
      </button>
      {userScore !== null && (
        <button
          onClick={onClearScore}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm"
        >
          Clear Score
        </button>
      )}
    </div>
  );
};

export default PuzzleControls; 