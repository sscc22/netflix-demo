import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/tmdbAPI';
import { toggleWishlist, isInWishlist } from '../utils/firebaseWishlist';
import { getCurrentUser } from '../utils/firebaseAuth';
import './MovieCard.css';

const MovieCard = ({ movie, onWishlistChange }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [movie.id]);

  const checkWishlistStatus = async () => {
    const user = getCurrentUser();
    if (user) {
      const status = await isInWishlist(user.uid, movie.id);
      setInWishlist(status);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    
    const user = getCurrentUser();
    if (!user) {
      alert('Please sign in to add movies to your wishlist');
      return;
    }

    setLoading(true);
    
    try {
      const result = await toggleWishlist(user.uid, movie);
      
      if (result.success) {
        setInWishlist(!inWishlist);
        if (onWishlistChange) {
          onWishlistChange();
        }
      } else {
        console.error('Error toggling wishlist:', result.error);
        alert('Failed to update wishlist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-card-inner">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-overlay">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-info">
            <span className="movie-rating">
              <i className="fas fa-star"></i> {movie.vote_average?.toFixed(1)}
            </span>
            <span className="movie-date">
              {movie.release_date?.split('-')[0]}
            </span>
          </div>
          <button 
            className={`wishlist-btn ${inWishlist ? 'active' : ''} ${loading ? 'loading' : ''}`}
            onClick={handleWishlistToggle}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <i className={`fas fa-heart ${inWishlist ? 'filled' : ''}`}></i>
                <span>{inWishlist ? 'Remove' : 'Add to Wishlist'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
