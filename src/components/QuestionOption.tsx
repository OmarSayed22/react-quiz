import useQuiz from "../hooks/useQuiz";

export default function QuestionOption() {
  const {
    state: { questions, answer, index },
    newAnswer,
  } = useQuiz();

  const hasAnswered = answer !== null;
  const { options, correctOption } = questions[index];
  function handleClick() {
    newAnswer();
  }
  return (
    <>
      {" "}
      {options.map((option, index) => (
        <div className="options" key={option}>
          <button
            disabled={hasAnswered}
            className={`btn btn-option  ${index === answer ? "answer" : ""} ${
              hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
            }`}
            onClick={handleClick}
          >
            {option}{" "}
          </button>
        </div>
      ))}
    </>
  );
}
