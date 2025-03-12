import React from "react";
import { useParams } from "react-router-dom";
import PuzzleView from "./PuzzleView";
import PageViewTracker from "./analytics/PageViewTracker";

const PuzzleDetail = () => {
  const { date } = useParams();
  
  return (
    <PageViewTracker 
      pageName="Puzzle Detail"
      additionalData={{
        puzzleDate: date,
        isDaily: false
      }}
    >
      <PuzzleView puzzleDate={date} />
    </PageViewTracker>
  );
};

export default PuzzleDetail;
