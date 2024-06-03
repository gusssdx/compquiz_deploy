import React, { useState, useEffect } from 'react';

const QuizBox = ({ question, options, answer, timer, currentQuestionNumber, totalQuestions, onOptionSelect, onNext, isLastQuestion }) => {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeOut();
    }
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    setTimeLeft(timer);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question, timer]);

  useEffect(() => {
    let nextQuestionTimeout;
    if (isAnswered) {
      nextQuestionTimeout = setTimeout(() => {
        onNext();
      }, 3000);
    }
    return () => clearTimeout(nextQuestionTimeout);
  }, [isAnswered, onNext]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);
    onOptionSelect(option);
  };

  const handleTimeOut = () => {
    setSelectedOption(null);
    setIsAnswered(true);
  };

  const renderOption = (option, index) => {
    let className = "option bg-green-400 border border-green-500 rounded-lg py-2 px-4 mb-3 cursor-pointer";
    let icon = null;

    if (isAnswered) {
      if (option === answer) {
        className += " correct bg-green-500";
        icon = <span className="ml-2">✔️</span>;
      } else if (option === selectedOption) {
        className += " incorrect bg-red-500";
        icon = <span className="ml-2">❌</span>;
      } else {
        className += " disabled";
      }
    }

    return (
      <div
        key={index}
        className={className}
        onClick={() => !isAnswered && handleOptionSelect(option)}
      >
        {option} {icon}
      </div>
    );
  };

  return (
    <div className="quiz_box bg-white p-6 rounded-lg shadow-lg">
      <header className="flex justify-between items-center mb-4">
        <div className="title text-xl font-semibold">Quiz Application</div>
        <div className="timer flex items-center bg-green-100 border border-green-300 rounded-lg px-3 py-1">
          <div className="time_left_txt">Time Left</div>
          <div className="timer_sec ml-2 bg-green-400 text-white rounded-lg px-2">{timeLeft}</div>
        </div>
      </header>

      <section>
        <div className="que_text mb-4 text-lg font-medium">{question}</div>
        <div className="option_list">
          {options && options.map((option, index) => renderOption(option, index))}
        </div>
      </section>

      <footer className="flex justify-between items-center mt-4 border-t pt-4">
        <div className="total_que">
          Question <span>{currentQuestionNumber}</span> of <span>{totalQuestions}</span>
        </div>
        <button className="next_btn bg-green-500 text-white py-2 px-4 rounded-lg" onClick={onNext} disabled={!isAnswered}>
          {isLastQuestion ? "End Quiz" : "Next Question"}
        </button>
      </footer>
    </div>
  );
};

export default QuizBox;
