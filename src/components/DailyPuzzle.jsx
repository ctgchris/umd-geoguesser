import React from "react";
import PuzzleView from "./PuzzleView";
import PageViewTracker from "./analytics/PageViewTracker";

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
    return (
      <PageViewTracker 
        pageName="Daily Puzzle"
        additionalData={{
          puzzleDate: today,
          isDaily: true
        }}
      >
        <PuzzleView puzzleDate={today} />
      </PageViewTracker>
    );
  };

export default DailyPuzzle;
