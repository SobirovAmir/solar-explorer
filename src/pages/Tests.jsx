import React from 'react';
import { Link } from 'react-router-dom';
import './Tests.css';

const Tests = () => {
  const testFiles = [
    'lesson1.txt',
    'lesson2.txt',
    'lesson3.txt',
    'lesson4.txt',
    'lesson5.txt',
    'lesson6.txt',
    'lesson7.txt',
    'lesson8.txt',
    'lesson9.txt',
    'lesson10.txt',
  ];

  return (
    <div className="tests-container">

      <div className="test-list">
        <ul>
          {testFiles.map((file, index) => {
            const lessonId = file.replace('.txt', '');
            return (
              <li key={index} className="test-item">
                <Link to={`/tests/${lessonId}`} className="test-link">
                  Lecture {index + 1} Test
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <footer>
        <p>Good luck on your cosmic journey!</p>
      </footer>
    </div>
  );
};

export default Tests;
