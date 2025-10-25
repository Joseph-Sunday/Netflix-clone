import { useState } from "react";
import { useSmartRecommendations } from "../hooks/useSmartRecommendations";
import MovieCard from "../components/MovieCard";

const SmartRecommendation = () => {
  const [type, setType] = useState("movie");
  const [genre, setGenre] = useState("");
  const { content, loading } = useSmartRecommendations(type, genre);

  return (
    <>
      <section className="">
        <div className="container-fluid mt-5 p-4 d-md-flex justify-content-between align-items-center flex-wrap">
          <h1 className="text-light ff-head mx-lg-4">Smart Recommendations</h1>

          <div className=" d-md-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            <div className="d-md-flex justify-content-center align-items-baseline gap-2">
              <p className="text-light ff-text fs-sml m-0">Genre</p>
              <div className="btn-group mt-1">
                <select
                  className="btn btn-sm text-light border rounded-0 fs-sml"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">All Genres</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror">Horror</option>
                  <option value="SciFi">Science Fiction</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
            </div>

            <div className="btn-group mt-1">
              <select className="btn btn-sm text-light border rounded-0 fs-sml">
                <option value="en">English Au</option>
              </select>
            </div>

            <div className="d-md-flex justify-content-center align-items-baseline gap-2">
              <p className="text-light ff-text fs-sml m-0 mt-1">Sort by</p>
              <div className="btn-group mt-1">
                <select
                  className="btn btn-sm text-light border rounded-0 fs-sml"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="movie">Films</option>
                  <option value="tv">Series</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <p className="text-light text-center fs-sml">
          Loading {type === "movie" ? "Films" : "Series"}...
        </p>
      ) : (
        <div className="my-2 p-lg-none px-3 overflow-auto scroll-container d-md-flex align-items-baseline justify-content-start gap-2 flex-wrap">
          {content.length > 0 ? (
            content.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                showBanner={Math.random() < 0.4}
              />
            ))
          ) : (
            <p className="text-light text-center fs-sml">
              No {type === "movie" ? "Films" : "Series"} Found!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default SmartRecommendation;
