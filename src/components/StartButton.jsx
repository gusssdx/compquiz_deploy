import React from 'react';

const StartButton = ({ onStart }) => {
  return (
    <div className="start_btn">
      <button className="text-2xl font-medium text-green-500 py-3 px-6 bg-white rounded-lg" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartButton;
