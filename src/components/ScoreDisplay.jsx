import React from 'react';

const ScoreDisplay = ({
  userScore,
  onShare,
  showShareMessage,
  currentUser,
  revealedLocation,
  puzzleData
}) => {
  return (
    <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
      <p className="text-lg font-semibold text-blue-800">
        Your Score: <span className="text-2xl">{userScore}</span> guess{userScore !== 1 && "es"}
      </p>
      
      <button
        onClick={onShare}
        className="mt-4 bg-[#E21833] hover:bg-[#8B0000] text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200"
      >
        Share Result
      </button>

      {!currentUser && (
        <div className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg mt-2">
          You're not signed in. Sign in to save your scores permanently and track your progress across devices!
        </div>
      )}

      {showShareMessage && (
        <div className="mt-2 text-green-600 font-medium animate-fade-in">
          Copied to clipboard!
        </div>
      )}

      {revealedLocation && (puzzleData.imageDescription || puzzleData.aiFunFacts) && (
        <div className="mt-4 pt-4 border-t border-blue-300">
          {puzzleData.imageDescription && (
            <div className="mb-4">
              <h4 className="text-blue-800 font-medium mb-1">Picture Description:</h4>
              <p className="text-blue-800 leading-relaxed bg-blue-50 p-3 rounded">
                {puzzleData.imageDescription}
              </p>
            </div>
          )}
          
          {puzzleData.aiFunFacts && (
            <div>
              <h4 className="text-blue-800 font-medium mb-1">Location Summary by Google Gemini AI</h4>
              <p className="text-blue-800 leading-relaxed bg-blue-50 p-3 rounded">
                {puzzleData.aiFunFacts}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay; 