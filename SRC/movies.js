import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // For viewing detailed info

  useEffect(() => {
    if (!isSearching) {
      fetchPopularMovies();
    }
  }, [isSearching]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=46086afeb2bfa4357a27b64c70107049`
      );
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const searchMovies = async () => {
    if (query.trim() === '') {
      setIsSearching(false);
      return fetchPopularMovies();
    }

    try {
      setIsSearching(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=46086afeb2bfa4357a27b64c70107049&query=${query}`
      );
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const viewDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={searchMovies}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Movies Grid */}
      <h2 className="text-2xl font-semibold mb-4">Movies List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow-md">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="mt-2 text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_date}</p>
            <button
              onClick={() => addToFavorites(movie)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Favorites
            </button>
            <button
              onClick={() => viewDetails(movie)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded ml-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded shadow-md">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded"
              />
              <h2 className="mt-2 text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-600">{movie.release_date}</p>
              <button
                onClick={() => removeFromFavorites(movie.id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites added yet. Start adding your favorite movies!</p>
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full h-64 object-cover rounded my-4"
            />
            <p>
              <strong>Release Date:</strong> {selectedMovie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {selectedMovie.vote_average} / 10
            </p>
            <p className="mt-4">{selectedMovie.overview}</p>
            <button
              onClick={closeDetails}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
