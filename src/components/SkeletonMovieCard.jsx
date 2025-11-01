import React from "react";
import "../css/MovieCard.css";

const SkeletonMovieCard = () => {
  return (
    <div className="card movie-card bg-dark skeleton-card">
      <div className="skeleton poster-skeleton" />

      <div className="movie-card-overlay border">
        <div className="movie-card-brands">
          <div className="skeleton logo-skeleton" />
        </div>
      </div>

      <span className="movie-card-banner-btm fs-sml skeleton-banner" />

      <div className="movie-card-details bg-net-black py-2 px-3">
        <div className="movie-card-details-buttons container-fluid d-flex justify-content-between">
          <div className="d-flex gap-2">
            <div className="skeleton button-skeleton rounded-circle" />
            <div className="skeleton button-skeleton rounded-circle" />
            <div className="skeleton button-skeleton rounded-circle" />
          </div>

          <div>
            <div className="skeleton button-skeleton rounded-circle" />
          </div>
        </div>

        <div className="container-fluid movie-card-details-overview">
          <div className="skeleton line-skeleton short" />
          <div className="skeleton line-skeleton long" />
        </div>

        <div className="movie-card-details-title">
          <div className="skeleton line-skeleton title" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonMovieCard;
