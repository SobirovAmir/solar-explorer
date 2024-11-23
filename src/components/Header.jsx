import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"; // Make sure to create an updated CSS file

const Header = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/materials", label: "Lectures" },
    { path: "/tests", label: "Tests" },
    { path: "/resources", label: "Resources" },
  ];

  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/" className="logo">
          <img src="/public/Logo.png" alt="Logo" />
          <span className="logo-text">Solar Explorer</span>
        </NavLink>
      </div>
      <nav className="nav">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
