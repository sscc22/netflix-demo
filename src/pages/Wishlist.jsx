import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getUserWishlist, clearWishlist } from '../utils/firebaseWishlist';
import { getCurrentUser } from '../utils/firebaseAuth';
import './Wishlist.css';

const Wishlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistUpdate, setWishlistUpdate] = useState(0);

  useEffect(() => {
    fetchWishlist();
  }, [wishlistUpdate]);

  const fetchWishlist = async () => {
    const user = getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const wishlist = await getUserWishlist(user.uid);
      // Firestore 데이터를 영화 객체 형태로 변환
      const movieData = wishlist.map(item => ({
        id: item.movieId,
        title: item.title,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        release_date: item.release_date,
        overview: item.overview
      }));
      setMovies(movieData);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistChange = () => {
    setWishlistUpdate(prev => prev + 1);
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all movies from your wishlist?')) {
      return;
    }

    const user = getCurrentUser();
    if (!user) return;

    try {
      const result = await clearWishlist(user.uid);
      if (result.success) {
        setWishlistUpdate(prev => prev + 1);
        // Toast 알림
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = 'Wishlist cleared successfully!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      alert('Failed to clear wishlist. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-heart"></i> My Wishlist
          </h1>
          <p className="subtitle">
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in your wishlist
          </p>
        </div>
        {movies.length > 0 && (
          <button className="clear-btn" onClick={handleClearAll}>
            <i className="fas fa-trash"></i> Clear All
          </button>
        )}
      </div>

      <div className="wishlist-container">
        {movies.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-icon">
              <i className="fas fa-heart-broken"></i>
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding movies to your wishlist to see them here!</p>
            <a href="/" className="btn btn-primary">
              <i className="fas fa-home"></i> Browse Movies
            </a>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
