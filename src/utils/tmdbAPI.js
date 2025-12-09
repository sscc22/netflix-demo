import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const getApiKey = () => {
  return localStorage.getItem('TMDb-Key') || '';
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchMovies = async (endpoint, page = 1) => {
  const apiKey = getApiKey();
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: apiKey,
        language: 'ko-KR',
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getPopularMovies = (page = 1) => {
  return fetchMovies('/movie/popular', page);
};

export const getNowPlayingMovies = (page = 1) => {
  return fetchMovies('/movie/now_playing', page);
};

export const getTopRatedMovies = (page = 1) => {
  return fetchMovies('/movie/top_rated', page);
};

export const getUpcomingMovies = (page = 1) => {
  return fetchMovies('/movie/upcoming', page);
};

export const searchMovies = async (query, page = 1) => {
  const apiKey = getApiKey();
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: apiKey,
        language: 'ko-KR',
        query: query,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const apiKey = getApiKey();
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: 'ko-KR',
        with_genres: genreId,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

export const getGenres = async () => {
  const apiKey = getApiKey();
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: apiKey,
        language: 'ko-KR'
      }
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};
