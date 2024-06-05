import React, { useState, useEffect } from 'react';
import './App.css';
import StartButton from './components/StartButton';
import InfoBox from './components/InfoBox';
import QuizBox from './components/QuizBox';
import ResultBox from './components/ResultBox';
import { useQuestions } from './data/question';

const App = () => {
  const { questions, loading, error, reloadQuestions } = useQuestions();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Start quiz only when loading is false, questions are loaded, and quiz has not started yet
    if (!loading && questions.length > 0 && quizStarted) {
    }
  }, [loading, questions, quizStarted]);
  
  const handleStartQuiz = async () => {
    await reloadQuestions(); // Reload questions when starting the quiz
    setCurrentQuestion(0); // Reset current question to the first one
    setScore(0); // Reset score
    setShowInfoBox(true);
    setQuizStarted(true); // Start quiz after loading questions
  };

  const handleContinue = () => {
    setShowInfoBox(false);
  };

  const handleExit = () => {
    setQuizStarted(false);
    setShowInfoBox(false);
  };

  const handleOptionSelect = (selectedOption) => {
    const currentQuestionObj = questions[currentQuestion];
    if (selectedOption === currentQuestionObj.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResultBox(true);
    }
  };

  const handleRestartQuiz = async () => {
    await reloadQuestions(); // Reload questions when starting the quiz
    setCurrentQuestion(0); // Reset current question to the first one
    setScore(0);
    setQuizStarted(true);
    setShowResultBox(false);
  };

  const handleQuitQuiz = () => {
    setQuizStarted(false);
    setShowResultBox(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">CompQuiz</h1>
      {!quizStarted && <StartButton onStart={handleStartQuiz} />}
      {quizStarted && showInfoBox && (
        <InfoBox onContinue={handleContinue} onExit={handleExit} />
      )}
      {quizStarted && !showInfoBox && !showResultBox && (
        <QuizBox
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          answer={questions[currentQuestion].answer}
          timer={15}
          currentQuestionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onOptionSelect={handleOptionSelect}
          onNext={handleNextQuestion}
          isLastQuestion={currentQuestion === questions.length - 1}
        />
      )}
      {showResultBox && (
        <ResultBox
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestartQuiz}
          onQuit={handleQuitQuiz}
        />
      )}
    </div>
  );
};

export default App;
