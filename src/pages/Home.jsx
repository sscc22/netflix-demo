import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { 
  getPopularMovies, 
  getNowPlayingMovies, 
  getTopRatedMovies, 
  getUpcomingMovies 
} from '../utils/tmdbAPI';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistUpdate, setWishlistUpdate] = useState(0);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const [popular, nowPlaying, topRated, upcoming] = await Promise.all([
          getPopularMovies(),
          getNowPlayingMovies(),
          getTopRatedMovies(),
          getUpcomingMovies()
        ]);

        setPopularMovies(popular.results);
        setNowPlayingMovies(nowPlaying.results);
        setTopRatedMovies(topRated.results);
        setUpcomingMovies(upcoming.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const handleWishlistChange = () => {
    setWishlistUpdate(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <i className="fas fa-film"></i> Welcome to Netflix Demo
          </h1>
          <p className="hero-subtitle">
            Discover thousands of movies and TV shows
          </p>
        </div>
      </section>

      <div className="content-wrapper">
        <section className="movie-section">
          <h2 className="section-title">
            <i className="fas fa-fire"></i> Popular Movies
          </h2>
          <div className="movie-grid">
            {popularMovies.slice(0, 6).map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        </section>

        <section className="movie-section">
          <h2 className="section-title">
            <i className="fas fa-play-circle"></i> Now Playing
          </h2>
          <div className="movie-grid">
            {nowPlayingMovies.slice(0, 6).map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        </section>

        <section className="movie-section">
          <h2 className="section-title">
            <i className="fas fa-star"></i> Top Rated
          </h2>
          <div className="movie-grid">
            {topRatedMovies.slice(0, 6).map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        </section>

        <section className="movie-section">
          <h2 className="section-title">
            <i className="fas fa-calendar-alt"></i> Upcoming
          </h2>
          <div className="movie-grid">
            {upcomingMovies.slice(0, 6).map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
