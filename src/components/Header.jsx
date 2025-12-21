import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, onAuthChange } from '../utils/firebaseAuth';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Firebase 인증 상태 감지
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate('/signin');
    }
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

        {user && (
          <div className="user-section">
            <div className="user-profile">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="user-avatar"
                />
              ) : (
                <div className="user-avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
              <span className="user-name">{user.displayName || user.email}</span>
            </div>
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
