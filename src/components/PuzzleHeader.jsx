import React from 'react';

const PuzzleHeader = ({ date, difficulty }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Daily Puzzle for {date}</h2>
      {difficulty && (
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
          difficulty === 'easy' ? 'bg-green-100 text-green-800' :
          difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          Difficulty: {difficulty || 'Medium'}
        </span>
      )}
    </div>
  );
};

export default PuzzleHeader; 