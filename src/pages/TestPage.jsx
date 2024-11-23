import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TestPage.css';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const parseTestFile = (text) => {
  const questions = text
    .trim()
    .split('\n?') // Разделяем вопросы
    .filter(Boolean) // Убираем пустые строки
    .map((block) => {
      const lines = block.split('\n');
      const question = lines[0].replace('?', '').trim(); // Убираем символ "?"
      const options = lines.slice(1).map((line) => ({
        text: line.replace(/^[-+]/, '').trim(), // Убираем "-" или "+"
        isCorrect: line.startsWith('+'), // Правильный ответ помечается "+"
      }));

      return {
        question,
        options: shuffleArray(options), // Перемешиваем варианты
        selected: null,
      };
    });

  return shuffleArray(questions); // Перемешиваем сами вопросы
};

const TestsPage = () => {
  const { lessonId } = useParams();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  let number = lessonId.match(/\d+/)[0];
  
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`/tests/${lessonId}.txt`);
        const text = await response.text();
        setTests(parseTestFile(text)); // Парсим файл
      } catch (error) {
        console.error('Ошибка загрузки тестов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [lessonId]);

  const handleAnswer = (index, selectedOption) => {
    const updatedTests = [...tests];
    updatedTests[index].selected = selectedOption;
    setTests(updatedTests);
  };

  const finishTest = () => {
    const correctAnswers = tests.filter(
      (test) =>
        test.options.find((option) => option.isCorrect)?.text === test.selected
    ).length;

    setResults({ correct: correctAnswers, total: tests.length });
    setFinished(true);
  };

  if (loading) {
    return (
      <div className="testspage-loader">
        <p>Loading tests...</p>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((results.correct / results.total) * 100);
    return (
      <div className="testspage-results">
        <h2>Test Finished</h2>
        <p>
          You answered {results.correct} out of {results.total} questions
          correctly.
        </p>
        <p>Accuracy: {percentage}%</p>
        <button className="testspage-back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="testspage">
      <h1>Lecture {number} Test</h1>
      <button className="testspage-back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      {tests.map((test, index) => (
        <div className="testspage-question" key={index}>
          <h3>{test.question}</h3>
          <ul>
            {test.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.text}
                    checked={test.selected === option.text}
                    onChange={() => handleAnswer(index, option.text)}
                  />
                  {option.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="testspage-finish-button" onClick={finishTest}>
        Finish Test
      </button>
    </div>
  );
};

export default TestsPage;
