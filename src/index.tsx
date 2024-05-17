import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Homescreen from './Screens/Homescreen/Homescreen';
import { MovieProvider } from '../src/Context/MoviesContext';
import MovieInfoScreen from './Screens/MovieInfo/MovieInfoScreen';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/movie/:movieId" element={<MovieInfoScreen />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
