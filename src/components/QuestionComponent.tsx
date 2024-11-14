import QuestionOption from "./QuestionOption";
import NextButton from "./NextButton";
import Timer from "./Timer";
import useQuiz from "../hooks/useQuiz";

export default function QuestionComponent() {
  const {
    state: { questions, index },
  } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <QuestionOption />
      <Timer />
      <NextButton />
    </div>
  );
}
