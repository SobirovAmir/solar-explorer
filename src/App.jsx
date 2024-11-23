import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Materials from './pages/Materials';
import Tests from './pages/Tests';
import TestPage from './pages/TestPage'; // Создайте компонент для отображения теста по уроку

import Resources from './pages/Resources';
import Lesson from "./pages/Lesson"; 

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/materials/:lessonId" element={<Lesson />} />

        <Route path="/tests" element={<Tests />} /> 
        <Route path="/tests/:lessonId" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;

