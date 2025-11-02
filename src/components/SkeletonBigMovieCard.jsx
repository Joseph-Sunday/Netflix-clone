import React from "react";
import "../css/BigMovieCard.css";
import "../css/App.css";
import "../css/MovieCard.css";

const SkeletonBigMovieCard = () => {
  return (
    <>
      <div className="big-movie-card-container card bg-dark text-light ">
        <div className="big-movie-card-img card-img rounded-0 skeleton" />

        <div className="big-movie-card-overlay card-img-overlay">
          <div className="big-movie-card-overlay-text ff-text fs-sml">
            <div className="skeleton line-skeleton short" />
            <div className="skeleton line-skeleton long" />
          </div>

          <div className="d-flex gap-2">
            <div className="skeleton big-btn-skeleton" />
            <div className="skeleton big-btn-skeleton" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonBigMovieCard;
