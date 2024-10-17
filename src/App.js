import './App.css';
// import { AddColor } from './AddColor.js'
import { MovieList } from "./MovieList"
import { AddMovie } from "./AddMovie";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { MovieDetails } from './MovieDetails';
import { Home } from './Home';
import { NotFound } from './NotFound';
//import { BasicForm } from './BasicForm';
import { MovieEdit } from './MovieEdit';

function App() {
  const [mode, setMode] = useState('light');
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const [movieList, setMovieList] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Paper style={{ minHeight: "100vh" }} elevation={5} >
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
              <Button color="inherit" onClick={() => navigate("/movies")}>Movies</Button>
              <Button color="inherit" onClick={() => navigate("/movies/add")}>Add Movies</Button>
              <Button color="inherit" onClick={() => navigate("/color-game")}>Color Game</Button>
              {/* <Button color="inherit" onClick={() => navigate("/basic-form")}>Basic Form</Button> */}
              <Button
                sx={{ marginLeft: 'auto' }}
                color="inherit"
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                {mode === 'light' ? 'dark' : 'light'} Theme </Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/add" element={<AddMovie movieList={movieList} setMovieList={setMovieList} />} />
            {/* <Route path="/color-game" element={<AddColor />} /> */}
            {/* <Route path="/basic-form" element={<BasicForm />} /> */}
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/edit/:id" element={<MovieEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ Paper>
      </ThemeProvider>
    </div >
  );
}

export default App;
