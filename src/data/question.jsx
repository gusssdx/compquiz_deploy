import { useState, useEffect } from 'react';

const fetchQuestions = async () => {
  const response = await fetch('https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.results.map((item, index) => ({
    numb: index + 1,
    question: unescapeHtml(item.question),
    answer: unescapeHtml(item.correct_answer),
    options: shuffleOptions(item.incorrect_answers.map(unescapeHtml).concat(unescapeHtml(item.correct_answer)))
  }));
};

const shuffleOptions = (optionsArray) => {
  return optionsArray.sort(() => Math.random() - 0.5);
};

const unescapeHtml = (text) => {
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};

// question.jsx

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQuestions = async () => {
    try {
      const questionsData = await fetchQuestions();
      setQuestions(shuffleOptions(questionsData)); // Shuffle questions each time
      setLoading(false);
      localStorage.setItem('quizQuestions', JSON.stringify(questionsData));
    } catch (err) {
      if (err.message.includes('429')) {
        // Retry logic for rate limiting
        console.error('Rate limit exceeded, retrying in 1 minute...');
        setTimeout(getQuestions, 60000); // Retry after 1 minute
      } else {
        setError(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const cachedQuestions = localStorage.getItem('quizQuestions');
    if (cachedQuestions) {
      setQuestions(JSON.parse(cachedQuestions));
      setLoading(false);
    } else {
      getQuestions();
    }
  }, []);

  return { questions, loading, error, reloadQuestions: getQuestions };
};
