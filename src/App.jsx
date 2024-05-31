import React, { useState } from 'react';
import './App.css';
import StartButton from './components/StartButton';
import InfoBox from './components/InfoBox';
import QuizBox from './components/QuizBox';
import ResultBox from './components/ResultBox';
import questions from './data/question';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setShowInfoBox(true);
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

  const handleRestartQuiz = () => {
    setQuizStarted(true);
    setShowResultBox(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleQuitQuiz = () => {
    setQuizStarted(false);
    setShowResultBox(false);
  };

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
          onOptionSelect={handleOptionSelect}
          timer={15} // Atur timer sesuai kebutuhan
          onNext={handleNextQuestion}
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
