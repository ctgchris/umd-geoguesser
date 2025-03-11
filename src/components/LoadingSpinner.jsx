import React from 'react';

const LoadingSpinner = ({ message = "Loading puzzle..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E21833] to-[#8B0000] text-white m-0 p-0">
      <div className="max-w-4xl mx-auto p-4">
        <div className="min-h-[400px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            <p className="text-xl font-semibold">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 