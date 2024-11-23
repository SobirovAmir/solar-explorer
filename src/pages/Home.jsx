import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Solar Physics and Space Weather</h1>
        <p className="hero-subtitle">Explore the mysteries of our Sun and its impact on Earth</p>
      </section>

      {/* Navigation Section */}
      <nav className="nav-section">
        <Link to="/materials" className="nav-card">
          <h2>Lectures</h2>
          <p>In-depth material on solar physics.</p>
        </Link>
        <Link to="/tests" className="nav-card">
          <h2>Tests</h2>
          <p>Check your knowledge with quizzes.</p>
        </Link>
        <Link to="/resources" className="nav-card">
          <h2>Resources</h2>
          <p>Additional materials and references.</p>
        </Link>
      </nav>

      {/* Information Section */}
      <section className="info-section">
        <div className="info-content">
          <h2>Why Study Solar Physics?</h2>
          <p>Discover how solar activity influences our planet, technology, and future space missions.</p>
        </div>
        <img src="/public/solar-physics.webp" alt="Solar Physics" className="info-image" />
      </section>
    </div>
  );
};

export default Home;
