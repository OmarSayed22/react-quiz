import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export default useQuiz;
