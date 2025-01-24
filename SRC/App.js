import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Movies from './movies'; // Ensure the file name is correct

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Movie App</h1>
      {/* Add a Link to navigate to the Movies page */}
      <Link to="/movies">
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
          Go to Movies
        </button>
      </Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
};

export default App;
