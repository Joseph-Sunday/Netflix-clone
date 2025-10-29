import "../css/App.css";
import "../css/MovieCard.css";
import { useList } from "../context/ListContext";
import netflixLogo from "../assets/netflixLogo.png";

const MovieCard = ({ movie, showBanner, onClick }) => {
  // My List logic
  const { addToList, removeFromList, myList } = useList();
  const isInList = myList.some((item) => item.id === movie.id);

  // Movie name/title logic
  const movieTitle = movie.title ? movie.title : movie.name;

  return (
    <div className="card movie-card bg-dark">
      <img
        src="/images/netflixLogo.png"
        className="movie-card-netflixLogo"
        alt="netflix-logo"
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="movie-card-poster-img"
        alt={movieTitle}
        onClick={() => onClick(movie)}
      />
      {showBanner && (
        <span className="movie-card-banner-btm fs-sml">Recently Added</span>
      )}

      <div className="movie-card-details bg-net-black py-2 px-3">
        <div className=" container-fluid py-2 movie-card-details-buttons d-flex justify-content-between">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <button
              type="button"
              className="btn rounded-circle d-flex justify-content-center align-items-center first-child"
            >
              <i className="bi bi-play-fill fs-6"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary bg-dark rounded-circle d-flex justify-content-center align-items-center"
              onClick={() =>
                isInList ? removeFromList(movie.id) : addToList(movie)
              }
            >
              <i
                className={`bi ${
                  isInList ? "bi-check-lg text-danger " : "bi-plus-lg"
                }`}
              ></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary bg-dark rounded-circle d-flex justify-content-center align-items-center"
            >
              <i className="bi bi-hand-thumbs-up fs-6"></i>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary bg-dark rounded-circle d-flex justify-content-center align-items-center"
              onClick={() => onClick(movie)}
            >
              <i className="bi bi-chevron-down fs-6"></i>
            </button>
          </div>
        </div>
        <div className=" container-fluid movie-card-details-overview">
          <p className="text-light fs-tiny text-start">
            {movie.overview.length > 100
              ? movie.overview.slice(0, 100) + "..."
              : movie.overview}
          </p>
          <div className="no-seasons"></div>
        </div>
        <div className="movie-card-details-title">
          <h6 className="text-light fs-sml text-center ff-head">
            <i className="bi-dot mx-1"></i>
            {movieTitle.length > 25
              ? movieTitle.slice(0, 25) + "..."
              : movieTitle}
            <i className="bi-dot mx-1"></i>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
