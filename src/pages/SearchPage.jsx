import Search from "../components/Search";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/api";
import RecommendedMovies from "../components/RecommendedMovies";
import "../css/Search.css";

const SearchPage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedMoviesError, setRecommendedMoviesError] = useState(null);
  const [recommendedMoviesLoading, setRecommendedMoviesLoading] =
    useState(true);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const recommendedMovies = await getPopularMovies();
        setRecommendedMovies(recommendedMovies);
      } catch (err) {
        console.log("couldnt fetch movies", recommendedMoviesError);
        setRecommendedMoviesError("failed to fetch recommended movies");
      } finally {
        setRecommendedMoviesLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, []);

  return (
    <>
      <Search />
      {recommendedMoviesLoading ? (
        <p className="text-light text-center mt-5 fs-sml"> Loading...</p>
      ) : recommendedMoviesError ? (
        <p>{recommendedMoviesError}</p>
      ) : (
        <div className="container-fluid recommended-movies-container mt-lg-5">
          <h3 className="text-light ff-head my-3 text-center fs-sml recommended-head">
            Recommended series and films
          </h3>
          {recommendedMovies.map((movie) => (
            <RecommendedMovies movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchPage;
