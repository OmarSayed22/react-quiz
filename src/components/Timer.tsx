import { useEffect } from "react";
import useQuiz from "../hooks/useQuiz";

export default function Timer() {
  const {
    state: { secondsRemaining },
    tick,
  } = useQuiz();

  useEffect(
    function () {
      const id = setInterval(function () {
        tick();
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [tick]
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
