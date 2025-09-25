import "../css/App.css";
import "../css/Search.css";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      console.log("Api response:", searchResults);
      setResults(searchResults.results || []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to fetch movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid mt-lg w-50">
        <form onSubmit={handleSearch} className="input-group news-input">
          <input
            type="text"
            className="form-control fs-sml"
            placeholder="Search games, series, films..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-dark btn-sm br-none " type="submit">
            Search
          </button>
        </form>
      </div>

      {loading && <p className="text-light text-center fs-sml ff-text mt-3">Loading...</p>}

      {error && <p className="text-danger text-center mt-2">{error}</p>}

      <div className="container-fluid my-3 d-flex justify-content-evenly align-items-center gap-2 overflow-auto scroll-container search-results-container">
        {results.length > 0
          ? results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : hasSearched &&
            !loading && (
              <p className="text-center text-secondary">
                No results found for "{searchQuery}"
              </p>
            )}
      </div>

      <div>
      </div>
    </>
  );
};

export default Search;
