import React from 'react';

const FeedbackSection = () => {
  return (
    <div className="bg-black text-white py-6 text-center">
      <p className="text-lg mb-4">Have any feedback/comments?</p>
      <a
        href="mailto:umdgeoguesser@gmail.com"
        className="inline-block bg-[rgb(226,24,51)] hover:bg-[rgb(203,22,46)] text-white py-2 px-6 rounded"
      >
        Contact Me
      </a>
    </div>
  );
};

export default FeedbackSection;
