import "../css/BigMovieCard.css";
import "../css/App.css";

const BigMovieCard = ({ movie, onClick }) => {
  const movieTitle = movie.title ? movie.title : movie.name;

  return (
    <div className="big-movie-card-container card bg-dark text-white rounded-0">
      <div className="">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="big-movie-card-img card-img rounded-0"
          alt={movieTitle}
        />
      </div>
      <div className="big-movie-card-overlay card-img-overlay">
        <div>
          <img src="/" alt="" className="big-movie-card-overlay-img" />
          <h2 className="big-movie-card-overlay-title card-title fw-bold">{movieTitle}</h2>
        </div>

        <p className="text-light fs-sml card-text small ff-text big-movie-card-overlay-text">
          {movie.overview.length > 250
            ? movie.overview.slice(0, 250) + "..."
            : movie.overview}
        </p>
        <div className="d-flex gap-2">
          <button
            className="big-movie-overlay-btn1 btn btn-sm px-4 ff-text fs-sml"
            type="button"
          >
            <i className="bi bi-play-fill"></i> Play
          </button>
          <button
            className="big-movie-overlay-btn2 btn btn-sm text-light px-2 ff-text fs-sml"
            type="button"
            onClick={() => onClick(movie)}
          >
            <i className="bi bi-info-circle"></i> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigMovieCard;
