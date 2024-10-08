import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../redux/searchSlice';

const MovieDetail = () => {
  const { id } = useParams();  // Get movie ID from the URL params
  const dispatch = useDispatch();
  const { movieDetails, loading } = useSelector((state) => state.search);

  const [trailer, setTrailer] = useState(null);  // For storing the YouTube trailer video ID
  const [trailerError, setTrailerError] = useState(null);  // To store any errors related to fetching the trailer

  useEffect(() => {
    dispatch(fetchMovieDetails(id));  // Fetch movie details from Redux

    const fetchTrailer = async () => {
      try {
        const ytResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&q=${movieDetails.Title} trailer&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        );
        const ytData = await ytResponse.json();
        
        // Check if the response contains valid items
        if (ytData.items && ytData.items.length > 0) {
          setTrailer(ytData.items[0].id.videoId);  // Use the first embeddable video found
        } else {
          // Handle no results
          setTrailerError('No trailer found for this movie.');
        }
      } catch (error) {
        console.error('Error fetching YouTube trailer:', error);
        setTrailerError('Error fetching trailer.');
      }
    };

    if (movieDetails.Title) {
      fetchTrailer();  // Fetch trailer after the movie title is available
    }
  }, [dispatch, id, movieDetails.Title]);

  return (
    <div className="container my-5">
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {/* Trailer on Top or error message */}
          {trailer ? (
            <div className="embed-responsive" style={{ position: 'relative', width: '640px', height: '360px', margin: '0 auto 30px auto' }}>
              <iframe
                className="embed-responsive-item"
                src={`https://www.youtube.com/embed/${trailer}`}
                title={`${movieDetails.Title} Trailer`}
                style={{ width: '100%', height: '100%' }}
                allowFullScreen
              ></iframe>
            </div>
          ) : trailerError ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{trailerError}</p>
          ) : null}

          {/* Movie Details */}
          <div className="movie-details" style={{ lineHeight: '1.6', color: '#333' }}>
            <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>{movieDetails.Title}</h1>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Released:</strong> {movieDetails.Released}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Actors:</strong> {movieDetails.Actors}</p>
            <p><strong>Awards:</strong> {movieDetails.Awards}</p>
            <p><strong>IMDB Rating:</strong> {movieDetails.imdbRating}/10</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
