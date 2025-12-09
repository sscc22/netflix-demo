import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopularMovies } from '../utils/tmdbAPI';
import './Popular.css';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('infinite');
  const [wishlistUpdate, setWishlistUpdate] = useState(0);
  const observer = useRef();
  const lastMovieRef = useRef();

  const fetchMovies = async (pageNum) => {
    try {
      setLoading(true);
      const data = await getPopularMovies(pageNum);
      
      if (viewMode === 'infinite') {
        setMovies(prev => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
      }
      
      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1);
  }, [viewMode]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && viewMode === 'infinite') {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, viewMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistChange = () => {
    setWishlistUpdate(prev => prev + 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    scrollToTop();
  };

  const renderPagination = () => {
    if (viewMode !== 'table') return null;

    return (
      <div className="pagination">
        <button 
          className="pagination-btn"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <i className="fas fa-chevron-left"></i> Previous
        </button>
        <span className="page-info">Page {page}</span>
        <button 
          className="pagination-btn"
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasMore}
        >
          Next <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    );
  };

  return (
    <div className={`popular-page ${viewMode}`}>
      <div className="page-header">
        <h1>
          <i className="fas fa-fire"></i> Popular Movies
        </h1>
        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <i className="fas fa-table"></i> Table View
          </button>
          <button
            className={`view-btn ${viewMode === 'infinite' ? 'active' : ''}`}
            onClick={() => setViewMode('infinite')}
          >
            <i className="fas fa-infinity"></i> Infinite Scroll
          </button>
        </div>
      </div>

      <div className="movies-container">
        <div className="movie-grid">
          {movies.map((movie, index) => {
            if (movies.length === index + 1 && viewMode === 'infinite') {
              return (
                <div ref={lastMovieElementRef} key={movie.id}>
                  <MovieCard 
                    movie={movie} 
                    onWishlistChange={handleWishlistChange}
                  />
                </div>
              );
            } else {
              return (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onWishlistChange={handleWishlistChange}
                />
              );
            }
          })}
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {renderPagination()}
      </div>

      {viewMode === 'infinite' && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default Popular;
