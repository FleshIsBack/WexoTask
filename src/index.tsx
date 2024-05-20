import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Homescreen from './Screens/Homescreen/Homescreen';
// import { MovieProvider } from '../src/Context/MoviesContext';
import { MoviesProvider } from './Context/WatchListContext';
import MovieInfoScreen from './Screens/MovieInfo/MovieInfoScreen';
import ShowGenres from './Screens/ShowGenres/ShowGenres';
import Genre from './Screens/Genre/Genre';
import ListShows from './Components/ListShows/ListShows';
import WatchList from './Screens/WatchList/WatchList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoviesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/shows/:movieId" element={<MovieInfoScreen />} />
          <Route path="movies" element={<ListShows movie={true} />} />
          <Route path="series" element={<ListShows movie={false} />} />
          <Route path="/genres" element={<ShowGenres />} />
          <Route path="/genres/:genreid" element={<Genre />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="*" element={<h2 style={{ minHeight: "100vh" }}>404 Not Found</h2>} />
        </Routes>
        <Footer />
      </Router>
    </MoviesProvider>
  </React.StrictMode>
);
