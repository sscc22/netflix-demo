import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, onAuthChange } from '../utils/firebaseAuth';
import './SignIn.css';

const SignIn = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인되어 있으면 홈으로 리다이렉트
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        showToast(`Welcome, ${result.user.displayName}!`, 'success');
        setTimeout(() => navigate('/'), 500);
      } else {
        setError(result.error);
        showToast('Login failed. Please try again.', 'error');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-background"></div>
      <div className="signin-container">
        <div className="signin-box firebase-signin">
          <div className="signin-header">
            <div className="logo-large">
              <i className="fas fa-film"></i>
            </div>
            <h1>Welcome to Netflix Demo</h1>
            <p>Sign in to access your personalized movie collection</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="signin-divider">
            <span>Quick & Secure Sign In</span>
          </div>

          <div className="signin-features">
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <span>Secure authentication with Google</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-cloud"></i>
              <span>Your wishlist synced across devices</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-bolt"></i>
              <span>Instant access to thousands of movies</span>
            </div>
          </div>
        </div>

        <div className="info-box">
          <h3><i className="fas fa-info-circle"></i> Why Sign In?</h3>
          <div className="features-list">
            <div className="feature-item">
              <i className="fas fa-heart"></i>
              <div>
                <strong>Personal Wishlist</strong>
                <p>Save your favorite movies to your account</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-sync"></i>
              <div>
                <strong>Cross-Device Sync</strong>
                <p>Access your wishlist from any device</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-star"></i>
              <div>
                <strong>Personalized Experience</strong>
                <p>Get recommendations based on your taste</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-lock"></i>
              <div>
                <strong>Secure & Private</strong>
                <p>Your data is encrypted and protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
