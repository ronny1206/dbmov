import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="card h-100"
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
          cursor: 'pointer',
          height: '320px'  // Set a fixed height for the card
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src={movie.Poster}
          className="card-img-top"
          alt={movie.Title}
          style={{
            height: '200px',  // Reduce the height of the movie poster
            objectFit: 'cover'
          }}
        />
        <div className="card-body text-center">
          <h5
            className="card-title"
            style={{
              fontSize: '0.9rem',  // Smaller font size for the title
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'  // Ensure long titles are cut off
            }}
          >
            {movie.Title}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default Movie;
