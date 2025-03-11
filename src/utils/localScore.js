// Get the local scores object from localStorage
export const getAllLocalScores = () => {
    return JSON.parse(localStorage.getItem("localScores")) || {};
  };
  
  // Get the score for a specific puzzle date
  export const getLocalScore = (puzzleDate) => {
    const scores = getAllLocalScores();
    return scores[puzzleDate] || null;
  };
  
  // Save or update the score for a specific puzzle date
  export const saveLocalScore = (puzzleDate, score) => {
    const scores = getAllLocalScores();
    scores[puzzleDate] = score;
    localStorage.setItem("localScores", JSON.stringify(scores));
  };
  
  // Clear the score for a specific puzzle date
  export const clearLocalScore = (puzzleDate) => {
    const scores = getAllLocalScores();
    delete scores[puzzleDate];
    localStorage.setItem("localScores", JSON.stringify(scores));
  };
  