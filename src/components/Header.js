import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, fetchMovies } from '../redux/searchSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [term, setTermState] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (term) {
      dispatch(setSearchTerm(term));
      dispatch(fetchMovies(term));  // Fetch movies based on search term
      navigate('/');  // Navigate back to home page for search results
    }
  };

  // Function to handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#ff3d00', padding: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="container d-flex justify-content-between">
        <a className="navbar-brand" href="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Movie Database
        </a>
        <div className="input-group" style={{ width: '350px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={term}
            onChange={(e) => setTermState(e.target.value)}
            onKeyDown={handleKeyDown}  // Trigger search on Enter key press
            style={{ borderRadius: '0.25rem 0 0 0.25rem' }}  // Left corners rounded
          />
          <button
            className="btn btn-light"
            onClick={handleSearch}
            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}  // Right corners rounded
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
