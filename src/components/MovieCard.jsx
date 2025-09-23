import "../css/App.css";
import "../css/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="card movie-card bg-dark">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="movie-card-poster-img"
        alt={movie.title}
      />
      <div className="movie-card-overlay">
        <div className="movie-card-brands">
          <img src="/" className="movie-card-brand-img1" alt="" />
          <img src="/" className="movie-card-brand-img2" alt="" />
        </div>
        <div className="">
          <h6 className="movie-card-title card-title text-light">
            {movie.title}
          </h6>
        </div>
      </div>
      <span className="movie-card-banner-btm fs-sml">New Season</span>
    </div>
  );
};

export default MovieCard;