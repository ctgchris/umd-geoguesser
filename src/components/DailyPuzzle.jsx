import React from "react";
import PuzzleView from "./PuzzleView";
const getLocalDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    // getMonth returns 0-based month, so add 1 and pad with zeros if necessary.
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const DailyPuzzle = () => {
    const today = getLocalDateString(); // Now using local date
    return <PuzzleView puzzleDate={today} />;
  };

export default DailyPuzzle;
