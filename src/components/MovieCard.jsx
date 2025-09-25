import "../css/App.css";
import "../css/MovieCard.css";

const MovieCard = ({ movie, showBanner }) => {
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
      </div>
      {showBanner && (
        <span className="movie-card-banner-btm fs-sml">Recently Added</span>
      )}
    </div>
  );
};

export default MovieCard;
