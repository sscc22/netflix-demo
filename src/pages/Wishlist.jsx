import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getWishlist, clearWishlist } from '../utils/wishlist';
import './Wishlist.css';

const Wishlist = () => {
  const [movies, setMovies] = useState([]);
  const [wishlistUpdate, setWishlistUpdate] = useState(0);

  useEffect(() => {
    const wishlist = getWishlist();
    setMovies(wishlist);
  }, [wishlistUpdate]);

  const handleWishlistChange = () => {
    setWishlistUpdate(prev => prev + 1);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all movies from your wishlist?')) {
      clearWishlist();
      setWishlistUpdate(prev => prev + 1);
    }
  };

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
