import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from './movieSlice';
import { Grid, Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status, selectedGenre } = useSelector((state) => state.movies);

  useEffect(() => {
    console.log("Selected Genre in MovieList:", selectedGenre); // Debugging message
    dispatch(getMovies(selectedGenre));
  }, [dispatch, selectedGenre]);

  useEffect(() => {
    console.log("Movies in state:", movies); // Debugging message
  }, [movies]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading data</div>;

  return (
    <Grid container spacing={5} marginTop={4} marginLeft={30} width={1250}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={3} key={movie.id}>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <Card>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;