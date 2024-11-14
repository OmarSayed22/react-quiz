import { useEffect } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import ErrorComponent from "./Error.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./layouts/StartScreen.tsx";
import Question from "./QuestionComponent.tsx"; // Import the Question component
import Progress from "./Progress.tsx";
import Finish from "./Finish.tsx";
import useQuiz from "../hooks/useQuiz.tsx";
import { Status } from "../types/Quiz.d";

export default function App() {
  const {
    fetchData,
    state: { status },
  } = useQuiz();
  useEffect(function () {
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      {status == Status.Loading && <Loader />}
      {status == Status.Failed && <ErrorComponent />}
      {status == Status.Ready && <StartScreen />}
      <MainComponent>
        {status == Status.Active && (
          <>
            <Progress />
            <Question />
          </>
        )}
        {status === Status.Finished && <Finish />}
      </MainComponent>
    </div>
  );
}
