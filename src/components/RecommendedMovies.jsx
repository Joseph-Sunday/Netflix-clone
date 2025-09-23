import "../css/App.css";
import "../css/RecommendedMovies.css";

const RecommendedMovies = ({ movie }) => {
  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center py-1">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h4 className="text-center ff-head text-light fs-6">{movie.title}</h4>
        <button type="button" className="btn btn-sm text-light">
          <span className="bi bi-play-circle fs-3"></span>
        </button>
      </div>
    </div>
  );
};

export default RecommendedMovies;
