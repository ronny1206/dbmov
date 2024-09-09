import React from 'react';
import { useSelector } from 'react-redux';
import Movie from './Movie';

const Search = () => {
  const { movies, loading } = useSelector((state) => state.search);

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center" style={{ fontWeight: 'bold' }}>Show Your Favorite Movies</h1>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="row" style={{ justifyContent: 'center' }}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="col-md-2 mb-4">
                <Movie movie={movie} />
              </div>
            ))
          ) : (
            <p className="text-center">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
