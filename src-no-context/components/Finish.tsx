import { Dispatch } from "react";
import { Action, ActionTypes } from "./App";

interface FinishProps {
  points: number;
  maxPoints: number;
  dispatch: Dispatch<ActionTypes>;
  highScore: number;
}

export default function Finish({
  points,
  maxPoints,
  dispatch,
  highScore,
}: FinishProps) {
  const score = Math.round((points / maxPoints) * 100);
  let emoji;
  if (score >= 100) {
    emoji = "🏆"; // Trophy emoji for perfect score
  } else if (score >= 80) {
    emoji = "😊"; // Smiling face for high score
  } else if (score >= 50) {
    emoji = "😐"; // Neutral face for medium score
  } else {
    emoji = "😞"; // Sad face for low score
  }

  return (
    <div className="finish">
      <div className="result">
        <p>
          <span>{emoji}</span>
          You scored <strong>{points}</strong> out of{" "}
          <strong>{maxPoints}</strong> ({score} % )
        </p>
      </div>
      <p className="highscore">
        {" "}
        (High Score : {points > highScore ? points : highScore} points)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: Action.Restart });
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
}
