import "../css/App.css";
import BigMovieCard from "../components/BigMovieCard";
import MovieCard from "../components/MovieCard";
import { getRandomMovie, getPopularMovies } from "../services/api";
import { useEffect, useState } from "react";

const Home = () => {
  // Random Movie
  const [movie, setMovie] = useState(null);
  const [randomMovieError, setRandomMovieError] = useState(null);
  const [randomMovieLoading, setRandomMovieLoading] = useState(true);

  // Random Movie
  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const randomMovie = await getRandomMovie();
        console.log("fetched random movie:", randomMovie);
        setMovie(randomMovie);
      } catch (error) {
        console.log(randomMovieError);
        setRandomMovieError("failed to load movie..");
      } finally {
        setRandomMovieLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  // Popular Movies
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularMoviesError, setPopularMoviesError] = useState(null);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);

  // Popular Movies
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("popular movies fetched:", popularMovies);
        setPopularMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setPopularMoviesError("movies failed to load");
      } finally {
        setPopularMoviesLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <div>
        {randomMovieLoading ? (
          <div className="Loading text-center">Loading...</div>
        ) : randomMovieError ? (
          <p>{randomMovieError}</p>
        ) : (
          <BigMovieCard movie={movie} />
        )}
      </div>
      <div>
        {popularMoviesLoading ? (
          <p className="text-center text-light">Loading popular movies...</p>
        ) : popularMoviesError ? (
          <p>{popularMoviesError}</p>
        ) : (
          <div className="">
            <h6 className="card-title text-light ff-text mx-3 mt-3">
              We think you'll love this
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {popularMovies.map((movie) => (
                <MovieCard movie={movie} key={popularMovies.id} />
              ))}
            </div>
            <div className="movie-card-arrows d-flex `justify-content-between">
              <button className="btn btn-sm btn-light">
                <i className="bi bi-arrow-left"></i>
              </button>
              <button className="btn btn-sm btn-light">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
