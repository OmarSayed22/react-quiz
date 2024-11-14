import { Action, ActionTypes } from "../App";

interface StartScreenProps {
  noOfQuestions?: number;
  dispatch: React.Dispatch<ActionTypes>;
}

function StartScreen({ noOfQuestions, dispatch }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h4>{noOfQuestions} questions to test your React mastery</h4>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: Action.Start });
        }}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
