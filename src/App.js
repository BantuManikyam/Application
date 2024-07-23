import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import Sidebar from './Sidebar';
import ResponsiveAppBar from './Header';


function App() {
  return (
    <Grid container>
      <ResponsiveAppBar />
      <Sidebar />
      <Grid item xs={12} sm={9}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;