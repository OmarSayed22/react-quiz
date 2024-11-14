import useQuiz from "../../hooks/useQuiz";

function StartScreen() {
  const {
    start,
    state: { questions },
  } = useQuiz();
  const noOfQuestions = questions.length || 0;

  function handleClick() {
    start();
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h4>{noOfQuestions} questions to test your React mastery</h4>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
