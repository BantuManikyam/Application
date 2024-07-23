import axios from 'axios';

const API_KEY = 'e3b8a31bef0b41fe70209f0fcebec51c';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (genreId = null) => {
  const genreQuery = genreId ? `&with_genres=${genreId}` : '';
  console.log(`Fetching movies with genre: ${genreId}`); // Debugging message
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}${genreQuery}`
  );
  console.log("API Response:", response.data.results); // Debugging message
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};