import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch movies from OMDB by search term
export const fetchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (searchTerm) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=27d81f94&s=${searchTerm}`);
    const data = await response.json();
    return data.Search || [];
  }
);

// Fetch detailed movie information by ID
export const fetchMovieDetails = createAsyncThunk(
  'search/fetchMovieDetails',
  async (movieId) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=27d81f94&i=${movieId}`);
    const data = await response.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    movies: [],
    loading: false,
    movieDetails: {}, // Added for storing movie details
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle fetching search results
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });

    // Handle fetching movie details
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;  // Store the fetched movie details in Redux
        state.loading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
