import { createContext, useMemo, useReducer } from "react";
import reducer from "./reducer";
import initialState from "./initialState";
import { Action, QuizContextType } from "../types/Quiz.d";

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

function QuizProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const maxPoints = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  function start() {
    dispatch({ type: Action.Start });
  }
  function restart() {
    dispatch({ type: Action.Restart });
  }
  function newAnswer() {
    dispatch({
      type: Action.NewAnswer,
      payload: state.index,
    });
  }
  function tick() {
    dispatch({ type: Action.Tick });
  }
  const noOfQuestions = state.questions.length;
  function next() {
    if (state.index < noOfQuestions - 1) {
      dispatch({ type: Action.Next });
    }
    if (state.index === noOfQuestions - 1) {
      dispatch({ type: Action.Finish });
    }
  }

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

  const context: QuizContextType = useMemo(
    () => ({
      state,
      fetchData,
      start,

      restart,
      tick,
      newAnswer,
      next,
      maxPoints,
    }),

    [state]
  );

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
