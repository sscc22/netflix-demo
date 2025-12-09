import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tryLogin, tryRegister, isValidEmail, setRememberMe } from '../utils/Authentication';
import './SignIn.css';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMeState] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    tryLogin(
      email,
      password,
      (user) => {
        setRememberMe(rememberMe);
        showToast('Login successful!', 'success');
        setTimeout(() => navigate('/'), 500);
      },
      (errorMsg) => {
        setError(errorMsg);
        showToast(errorMsg, 'error');
      }
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    tryRegister(
      email,
      password,
      () => {
        showToast('Registration successful! Please login.', 'success');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      },
      (errorMsg) => {
        setError(errorMsg);
        showToast(errorMsg, 'error');
      }
    );
  };

  return (
    <div className="signin-page">
      <div className="signin-background"></div>
      <div className="signin-container">
        <div className={`signin-box ${!isLogin ? 'register-mode' : ''}`}>
          <div className="signin-header">
            <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
            <p>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password (TMDB API Key)"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <i className="fas fa-lock"></i> Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {isLogin ? (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMeState(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
              </div>
            ) : (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>I agree to the terms and conditions</span>
                </label>
              </div>
            )}

            <button type="submit" className="btn btn-primary submit-btn">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="signin-footer">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* <div className="info-box">
          <h3><i className="fas fa-info-circle"></i> Notice</h3>
          <p>Please use your TMDB API Key as the password.</p>
          <p>You can get your API key from:</p>
          <a 
            href="https://www.themoviedb.org/settings/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tmdb-link"
          >
            <i className="fas fa-external-link-alt"></i> Get TMDB API Key
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
