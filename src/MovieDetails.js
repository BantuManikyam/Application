import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from './api';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);
    };
    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h4">{movie.title}</Typography>
        <Typography variant="body1">{movie.overview}</Typography>
        <Typography variant="body2">Release Date: {movie.release_date}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieDetails;