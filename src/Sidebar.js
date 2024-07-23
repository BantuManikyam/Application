import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { styled } from '@mui/system';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { setGenre, getMovies } from './movieSlice';

const genres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 18, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '240px',
  height: "100vh",
  backgroundColor: '#0A1929',
  color: "white",
  position: "fixed",
  top: 0,
  left: 0,
  paddingTop: "64px",
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    width: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '160px',
  },
}));

const CustomListItem = styled(ListItem)(({ theme, selected }) => ({
  backgroundColor: selected ? '#1e2a38' : 'transparent',
  color: selected ? 'white' : 'inherit',
  '&:hover': {
    backgroundColor: '#1e2a38',
    color: 'white',
  }
}));

const Sidebar = () => {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreOpen, setGenreOpen] = useState(false);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    dispatch(setGenre(genreId));
    dispatch(getMovies(genreId));
  };

  const handleGenreClick = () => {
    setGenreOpen(!genreOpen);
  };

  return (
    <SidebarContainer>
      <List>
        <ListItem button>
          <ListItemIcon>
            <LiveTvIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Web Series" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TvIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="TV Shows" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <WhatshotIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Popular Shows" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ChildCareIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Kids" />
        </ListItem>
        <ListItem button onClick={handleGenreClick}>
          <ListItemText primary="Genre" />
          {genreOpen ? <ExpandLessIcon sx={{ color: "white" }} /> : <ExpandMoreIcon sx={{ color: "white" }} />}
        </ListItem>
        <Collapse in={genreOpen} timeout="auto" unmountOnExit>
          <List>
            {genres.map((genre) => (
              <CustomListItem 
                button 
                key={genre.id} 
                selected={selectedGenre === genre.id}
                onClick={() => handleGenreChange(genre.id)}
              >
                {genre.name}
              </CustomListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
