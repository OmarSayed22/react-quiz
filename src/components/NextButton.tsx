import useQuiz from "../hooks/useQuiz";

export default function NextButton() {
  const {
    state: { questions, answer, index },
    next,
  } = useQuiz();

  const handleButtonClick = function () {
    next();
  };

  return (
    <>
      {answer !== null && (
        <button className="btn btn-ui" onClick={handleButtonClick}>
          {index < questions.length - 1 ? "Next" : "Finish"}
        </button>
      )}
    </>
  );
}
