import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';
import { useDispatch } from 'react-redux';
import { setSearchTerm, fetchMovies } from './redux/searchSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultSearchTerm = 'man';  // Default search term
    dispatch(setSearchTerm(defaultSearchTerm));
    dispatch(fetchMovies(defaultSearchTerm));  // Fetch movies with "man" as the initial term
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
