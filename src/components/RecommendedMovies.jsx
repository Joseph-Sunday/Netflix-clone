import "../css/App.css";
import "../css/RecommendedMovies.css";
import { useLocation, useNavigate } from "react-router-dom";

const RecommendedMovies = ({ movie, onClick }) => {
  const location = useLocation();

  return (
    <div className="" onClick={() => onClick(movie)}>
      <div className="d-flex justify-content-between align-items-center py-1 gap-3">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="recommended-movies-poster"
        />
        <h4 className="text-center ff-head text-light recommended-movies-title">
          {movie.title || movie.name}
        </h4>
        {location.pathname !== "/mylist" && (
          <button type="button" className="btn btn-sm text-light">
            <span className="bi bi-play-circle fs-3"></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default RecommendedMovies;
