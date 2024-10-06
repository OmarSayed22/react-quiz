import { Dispatch } from "react";
import { Action, ActionTypes, Answer, Question } from "./App";

interface QuestionOptionProps {
  question: Question;
  dispatch: Dispatch<ActionTypes>;
  answer: Answer;
}
export default function QuestionOption({
  question,
  dispatch,
  answer,
}: QuestionOptionProps) {
  const hasAnswered = answer !== null;
  const { options, correctOption } = question;
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
            onClick={() => {
              console.log(answer);
              dispatch({
                type: Action.NewAnswer,
                payload: index,
              });
            }}
          >
            {option}{" "}
          </button>
        </div>
      ))}
    </>
  );
}
