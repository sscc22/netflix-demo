import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, logout } from '../utils/Authentication';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <i className="fas fa-film"></i>
          <span>NETFLIX</span>
        </Link>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/popular" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-fire"></i> Popular
          </Link>
          <Link to="/search" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-search"></i> Search
          </Link>
          <Link to="/wishlist" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-heart"></i> Wishlist
          </Link>
        </nav>

        {loggedIn && (
          <div className="user-section">
            <span className="user-name">
              <i className="fas fa-user-circle"></i> {currentUser}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
