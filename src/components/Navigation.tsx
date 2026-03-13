import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

export const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📸 Kuukauden Kuva
        </Link>

        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Valikko"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/aanesta" className="nav-link" onClick={closeMenu}>Äänestä</Link>
              <Link to="/laheta" className="nav-link" onClick={closeMenu}>Lähetä</Link>
              <Link to="/tulokset" className="nav-link" onClick={closeMenu}>Tulokset</Link>
              <button onClick={handleLogout} className="nav-link btn-logout">
                Kirjaudu ulos
              </button>
            </>
          ) : (
            <>
              <Link to="/tulokset" className="nav-link" onClick={closeMenu}>Tulokset</Link>
              <Link to="/kirjaudu" className="nav-link" onClick={closeMenu}>Kirjaudu</Link>
              <Link to="/luo-tunnus" className="nav-link btn-register" onClick={closeMenu}>Luo tili</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

