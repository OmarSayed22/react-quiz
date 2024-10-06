import { Dispatch } from "react";
import { ActionTypes, Answer, Question } from "./App";
import QuestionOption from "./QuestionOption";
import NextButton from "./NextButton";
import Timer from "./Timer";

interface QuestionProps {
  question: Question;
  dispatch: Dispatch<ActionTypes>;
  answer: Answer;
  index: number;
  noOfQuestions: number;
  secondsRemaining: number;
}

export default function QuestionComponent({
  question,
  dispatch,
  answer,
  index,
  noOfQuestions,
  secondsRemaining,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <QuestionOption question={question} dispatch={dispatch} answer={answer} />
      <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        noOfQuestions={noOfQuestions}
      />
    </div>
  );
}
