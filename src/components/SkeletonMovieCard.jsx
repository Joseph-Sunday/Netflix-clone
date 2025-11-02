import React from "react";
import "../css/MovieCard.css";

const SkeletonMovieCard = () => {
  return (
    <div className="card movie-card bg-dark skeleton-card">
      <div className="skeleton poster-skeleton" />

      <div className="movie-card-overlay">
        <div className="movie-card-brands">
          <div className="skeleton logo-skeleton" />
        </div>
      </div>

      <div className="movie-card-details bg-net-black py-2 px-3">
        <div className="movie-card-details-buttons container-fluid d-flex justify-content-between">
          <div className="d-flex gap-2">
            <div className="skeleton btn-skeleton rounded-circle" />
            <div className="skeleton btn-skeleton rounded-circle" />
            <div className="skeleton btn-skeleton rounded-circle" />
          </div>

          <div>
            <div className="skeleton btn-skeleton rounded-circle" />
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
