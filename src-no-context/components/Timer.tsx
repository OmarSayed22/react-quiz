import { Dispatch, useEffect } from "react";
import { Action, ActionTypes } from "./App";

interface TimerProps {
  dispatch: Dispatch<ActionTypes>;
  secondsRemaining: number;
}

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: Action.Tick });
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );

  const mins = Math.ceil(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins} : {seconds < 10 && 0}
      {seconds}
      {}
    </div>
  );
}
