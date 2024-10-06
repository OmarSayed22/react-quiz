import { useEffect, useReducer } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import ErrorComponent from "./Error.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./layouts/StartScreen.tsx";
import Question from "./QuestionComponent.tsx"; // Import the Question component
import Progress from "./Progress.tsx";
import Finish from "./Finish.tsx";

const SEC_PER_QUESTION = 30;

export enum Action {
  DataReceived = "dataReceived",
  DataFailed = "dataFailed",
  Start = "start",
  NewAnswer = "newAnswer",
  Next = "next",
  Finish = "finish",
  Restart = "restart",
  Tick = "tick",
}

export type Answer = number | null;

export enum Status {
  Loading = "...loading",
  Ready = "ready",
  Failed = "failed",
  Active = "active",
  Finished = "finished",
}
export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};
type State = {
  questions: Question[];
  status: Status;
  index: number;
  answer: Answer;
  points: number;
  highScore: number;
  secondsRemaining: number;
};
export type ActionTypes =
  | { type: Action.DataReceived; payload: Question[] }
  | { type: Action.DataFailed; payload?: [] }
  | { type: Action.NewAnswer; payload: Answer }
  | { type: Action.Next; payload?: "" }
  | { type: Action.Start; payload?: [] }
  | { type: Action.Finish; payload?: [] }
  | { type: Action.Restart; payload?: [] }
  | { type: Action.Tick; payload?: [] };

const initialState: State = {
  questions: [],
  status: Status.Loading,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};
function reducer(state: State, action: ActionTypes): State {
  switch (action.type) {
    case Action.DataReceived:
      return {
        ...state,
        questions: action.payload,
        status: Status.Ready,
      };
    case Action.DataFailed:
      return { ...state, status: Status.Failed };
    case Action.Start:
      return {
        ...state,
        status: Status.Active,
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case Action.NewAnswer:
      if (action.payload !== null) {
        const currentQuestion = state.questions[state.index];
        console.log(currentQuestion);
        const isCorrectAnswer =
          currentQuestion.correctOption === action.payload;
        console.log(
          currentQuestion.correctOption,
          action.payload,
          isCorrectAnswer
        );
        return {
          ...state,
          answer: action.payload,
          points: isCorrectAnswer
            ? state.points + currentQuestion.points
            : state.points,
        };
      }
      return { ...state, answer: action.payload };
    case Action.Next:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case Action.Finish:
      return { ...state, status: Status.Finished, highScore: state.points };
    case Action.Restart:
      return {
        ...initialState,
        questions: state.questions,
        status: Status.Ready,
        highScore: state.highScore,
      };
    case Action.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? Status.Finished : state.status,
      };
    default:
      throw new Error("unknown action type: ");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  const noOfQuestions = questions.length;
  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();

        dispatch({
          type: Action.DataReceived,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: Action.DataFailed });
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      {status == Status.Loading && <Loader />}
      {status == Status.Failed && <ErrorComponent />}
      {status == Status.Ready && (
        <StartScreen noOfQuestions={noOfQuestions || 0} dispatch={dispatch} />
      )}
      <MainComponent>
        {status == Status.Active && (
          <>
            <Progress
              noOfQuestions={noOfQuestions}
              index={index}
              answer={answer}
              maxPoints={maxPoints}
              points={points}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              index={index}
              noOfQuestions={noOfQuestions}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === Status.Finished && (
          <Finish
            maxPoints={maxPoints}
            points={points}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </MainComponent>
    </div>
  );
}
