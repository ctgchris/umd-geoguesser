import React from "react";
import { useParams } from "react-router-dom";
import PuzzleView from "./PuzzleView";

const PuzzleDetail = () => {
  const { date } = useParams();
  return <PuzzleView puzzleDate={date} />;
};

export default PuzzleDetail;
