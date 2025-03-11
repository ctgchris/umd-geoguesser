import React from 'react';

const PuzzleNavigation = ({ onNextDay, onPrevDay, onBackToAll }) => {
  return (
    <div className="mt-6 flex justify-center items-center gap-4">
      <button
        onClick={onNextDay}
        className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded text-sm"
      >
        &lt; Next Day
      </button>
      <button
        onClick={onBackToAll}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm"
      >
        Back to All Puzzles
      </button>
      <button
        onClick={onPrevDay}
        className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-3 rounded text-sm"
      >
        Previous Day &gt;
      </button>
    </div>
  );
};

export default PuzzleNavigation; 