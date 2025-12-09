import React from 'react';
import { getImageUrl } from '../utils/tmdbAPI';
import { toggleWishlist, isInWishlist } from '../utils/wishlist';
import './MovieCard.css';

const MovieCard = ({ movie, onWishlistChange }) => {
  const inWishlist = isInWishlist(movie.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);
    if (onWishlistChange) {
      onWishlistChange();
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
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
          >
            <i className={`fas fa-heart ${inWishlist ? 'filled' : ''}`}></i>
            {inWishlist ? 'Remove' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
