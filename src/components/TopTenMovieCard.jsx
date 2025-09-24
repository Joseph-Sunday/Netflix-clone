import "../css/App.css";
import "../css/TopTenMovieCard.css";

const TopTenMovieCard = ({ movie, rank }) => {
  return (
    <>
      <div className="card bg-dark relative top-ten-movie-card rounded-0">
        <div className="container top-ten-movie-card-content d-flex align-items-center justify-content-end w-50">
          {rank && (
            <h1 className="top-ten-movie-card-rank text-secondary">
              {rank}
            </h1>
          )}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className=" top-ten-movie-card-poster"
          />
        </div>

        <div className="top-ten-movie-card-overlay"></div>
      </div>
    </>
  );
};

export default TopTenMovieCard;
