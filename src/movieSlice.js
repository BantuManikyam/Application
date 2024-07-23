import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails } from './api';

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (genreId) => {
    const response = await fetchMovies(genreId);
    console.log("Fetched movies for genre:", genreId, response); // Debugging message
    return response;
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (id) => {
    const response = await fetchMovieDetails(id);
    return response;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movieDetails: null,
    status: null,
    selectedGenre: null,
  },
  reducers: {
    setGenre: (state, action) => {
      console.log("Genre set to:", action.payload); // Debugging message
      state.selectedGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        console.log("Movies fetched successfully:", action.payload); // Debugging message
        state.movies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMovies.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMovieDetails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setGenre } = movieSlice.actions;

export default movieSlice.reducer;