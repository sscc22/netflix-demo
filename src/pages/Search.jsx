import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getMoviesByGenre, getGenres, getPopularMovies } from '../utils/tmdbAPI';
import './Search.css';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [wishlistUpdate, setWishlistUpdate] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let data;
      
      if (selectedGenre) {
        data = await getMoviesByGenre(selectedGenre);
      } else {
        data = await getPopularMovies();
      }

      let filteredMovies = data.results;

      if (minRating > 0) {
        filteredMovies = filteredMovies.filter(movie => movie.vote_average >= minRating);
      }

      filteredMovies = sortMovies(filteredMovies, sortBy);

      setMovies(filteredMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortMovies = (movieList, sortOption) => {
    const sorted = [...movieList];
    
    switch (sortOption) {
      case 'popularity.desc':
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case 'popularity.asc':
        return sorted.sort((a, b) => a.popularity - b.popularity);
      case 'vote_average.desc':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case 'vote_average.asc':
        return sorted.sort((a, b) => a.vote_average - b.vote_average);
      case 'release_date.desc':
        return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'release_date.asc':
        return sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, sortBy, minRating]);

  const handleReset = () => {
    setSelectedGenre('');
    setSortBy('popularity.desc');
    setMinRating(0);
  };

  const handleWishlistChange = () => {
    setWishlistUpdate(prev => prev + 1);
  };

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>
          <i className="fas fa-search"></i> Search & Filter Movies
        </h1>
      </div>

      <div className="filter-container">
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="genre">
              <i className="fas fa-film"></i> Genre
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">
              <i className="fas fa-sort"></i> Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="popularity.desc">Popularity (High to Low)</option>
              <option value="popularity.asc">Popularity (Low to High)</option>
              <option value="vote_average.desc">Rating (High to Low)</option>
              <option value="vote_average.asc">Rating (Low to High)</option>
              <option value="release_date.desc">Release Date (Newest)</option>
              <option value="release_date.asc">Release Date (Oldest)</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="rating">
              <i className="fas fa-star"></i> Minimum Rating: {minRating}
            </label>
            <input
              type="range"
              id="rating"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="filter-range"
            />
            <div className="rating-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <button className="reset-btn" onClick={handleReset}>
            <i className="fas fa-redo"></i> Reset Filters
          </button>
        </div>
      </div>

      <div className="results-container">
        <div className="results-header">
          <p className="results-count">
            <i className="fas fa-check-circle"></i> Found {movies.length} movies
          </p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
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

        {!loading && movies.length === 0 && (
          <div className="no-results">
            <i className="fas fa-film-slash"></i>
            <p>No movies found with the selected filters</p>
            <button className="btn btn-primary" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
