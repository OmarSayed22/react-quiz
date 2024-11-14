import { State, Action, Status, ActionTypes } from "../types/Quiz.d";
import initialState from "./initialState";

const SEC_PER_QUESTION = 30;

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

export default reducer;
