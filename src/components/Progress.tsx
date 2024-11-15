import useQuiz from "../hooks/useQuiz";
function Progress() {
  const {
    state: { questions, index, answer, points },
    maxPoints,
  } = useQuiz();

  const noOfQuestions = questions.length;
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
