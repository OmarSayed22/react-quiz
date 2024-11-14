import { State, Status } from "../types/Quiz.d";

const initialState: State = {
  questions: [],
  status: Status.Loading,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

export default initialState;
