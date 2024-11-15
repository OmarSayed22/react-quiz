import useQuiz from "../hooks/useQuiz";

export default function Finish() {
  const {
    state: { points, highScore },
    maxPoints,
    restart,
  } = useQuiz();

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    restart();
  };
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
      <button className="btn btn-ui" onClick={handleClick}>
        Restart Quiz
      </button>
    </div>
  );
}
