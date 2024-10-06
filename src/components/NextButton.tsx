import { Dispatch } from "react";
import { ActionTypes, Answer, Action } from "./App";

interface NextButtonProps {
  dispatch: Dispatch<ActionTypes>;
  answer: Answer;
  index: number;
  noOfQuestions: number;
}
export default function NextButton({
  answer,
  dispatch,
  index,
  noOfQuestions,
}: NextButtonProps) {
  const handleButtonClick = function () {
    if (index < noOfQuestions - 1) {
      dispatch({ type: Action.Next });
    }
    if (index === noOfQuestions - 1) {
      dispatch({ type: Action.Finish });
    }
  };

  return (
    <>
      {answer !== null && (
        <button className="btn btn-ui" onClick={handleButtonClick}>
          {index < noOfQuestions - 1 ? "Next" : "Finish"}
        </button>
      )}
    </>
  );
}
