export type QuizContextType = {
  state: State;
  fetchData: () => Promise<void>;
  start: () => void;

  restart: () => void;
  tick: () => void;
  newAnswer: () => void;
  next: () => void;
  maxPoints: number;
};

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
export type State = {
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
