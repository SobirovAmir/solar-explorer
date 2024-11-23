import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mammoth from 'mammoth';
import './Lesson.css';  // Подключаем файл стилей для улучшения отображения

const Lesson = () => {
  const { lessonId } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Для навигации

  // Загрузка и конвертация .docx в HTML
  const loadLesson = async () => {
    try {
      const response = await fetch(`/materials/${lessonId}.docx`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить урок');
      }
      const arrayBuffer = await response.arrayBuffer();
      
      mammoth.convertToHtml({ arrayBuffer })
        .then(result => {
          setContent(result.value);
          setLoading(false); // Загружено
        })
        .catch(error => {
          console.error('Ошибка при конвертации:', error);
          setLoading(false); // Ошибка загрузки
        });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setLoading(false); // Ошибка загрузки
    }
  };

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  // Функция для возврата назад
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="lesson-page-container">
      
      
      <button onClick={goBack} className="back-button-lesson">Back</button>
      {/* Лоадер */}
      {loading ? (
        <div className="lesson-loader">Loading...</div>
      ) : (
        
        <div
        className="lesson-text-content"
          dangerouslySetInnerHTML={{ __html: content }} // Вставляем HTML
          />
        )}
    </div>
  );
};

export default Lesson;
