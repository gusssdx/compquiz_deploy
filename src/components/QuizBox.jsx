import React from 'react';

const QuizBox = ({ question, options, onOptionSelect, timer, onNext }) => {
  return (
    <div className="quiz_box bg-white p-6 rounded-lg shadow-lg">
      
      <header className="flex justify-between items-center mb-4">
        <div className="title text-xl font-semibold">Quiz Application</div>
        <div className="timer flex items-center bg-green-100 border border-green-300 rounded-lg px-3 py-1">
          <div className="time_left_txt">Time Left</div>
          <div className="timer_sec ml-2 bg-green-400 text-white rounded-lg px-2">{timer}</div>
        </div>
      </header>

      <section>
        <div className="que_text mb-4 text-lg font-medium">{question}</div>
        <div className="option_list">
          {options && options.map((option, index) => (
            <div key={index} className="option bg-green-400 border border-green-500 rounded-lg py-2 px-4 mb-3 cursor-pointer" onClick={() => onOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>

      </section>
      <footer className="flex justify-between items-center mt-4 border-t pt-4">
        <div className="total_que">Question <span>{/* Current question number */}</span> of <span>{/* Total questions */}</span></div>
        <button className="next_btn bg-green-500 text-white py-2 px-4 rounded-lg" onClick={onNext}>Next Question</button>
      </footer>
    </div>
  );
};

export default QuizBox;
