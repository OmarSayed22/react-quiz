import { Answer } from "./App";

interface ProgressProps {
  noOfQuestions: number;
  index: number;
  answer: Answer;
  maxPoints: number;
  points: number;
}
function Progress({
  noOfQuestions,
  index,
  answer,
  points,
  maxPoints,
}: ProgressProps) {
  const value = index + (answer ? 1 : 0);
  return (
    <header className="progress">
      <progress max={noOfQuestions} value={value} />
      <p>
        Question <strong>{value}</strong> / <strong>{noOfQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong> / <strong>{maxPoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
