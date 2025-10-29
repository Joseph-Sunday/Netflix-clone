import "../css/App.css";
import "../css/Search.css";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import { Modal } from "react-bootstrap";
import { getGenreNames } from "../utils/getGenreNames";
import { useList } from "../context/ListContext";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      console.log("Api response:", searchResults);
      setResults(searchResults.results || []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to fetch movies...");
    } finally {
      setLoading(false);
    }
  };

  // Modal States
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFull, setShowFull] = useState(false);

  // Genre names
  let genreNames = getGenreNames(selectedMovie?.genre_ids || []);
  genreNames = genreNames.flatMap((name) =>
    name.split(",").map((g) => g.trim())
  );

  // My list states
  const { addToList, removeFromList, myList } = useList();
  const isInList = myList.some((item) => item.id === selectedMovie?.id);

  return (
    <>
      <div className="container-fluid mt-lg w-50">
        <form onSubmit={handleSearch} className="input-group news-input">
          <input
            type="text"
            className="form-control fs-sml"
            placeholder="Search games, series, films..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-dark btn-sm br-none " type="submit">
            Search
          </button>
        </form>
      </div>

      {loading && (
        <p className="text-light text-center fs-sml ff-text mt-3">Loading...</p>
      )}

      {error && <p className="text-danger text-center mt-2">{error}</p>}

      <div className="container-fluid my-3 d-flex justify-content-evenly align-items-center gap-2 overflow-auto scroll-container search-results-container">
        {results.length > 0
          ? results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))
          : hasSearched &&
            !loading && (
              <p className="text-center text-secondary">
                No results found for "{searchQuery}"
              </p>
            )}
      </div>

      <div></div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <Modal
          show={true}
          onHide={() => setSelectedMovie(null)}
          centered
          size="lg"
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="modal-head-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body dialogClassName="modal-body">
            <div className="modal-head-container mt-lg">
              <div className="modal-head-title text-light ff-head fs-2 wrap">
                {selectedMovie.title ? selectedMovie.title : selectedMovie.name}
              </div>

              <div className="modal-btn-overlay container-fluid d-flex align-items-center gap-2 mt-2">
                <button
                  type="button"
                  className="btn d-flex justify-content-center align-items-center "
                >
                  <i className="bi bi-play-fill fs-5"></i>
                  {selectedMovie.name ? "Next Episode" : "Play"}
                </button>
                <button
                  type="button"
                  className="btn bg-dark rounded-circle d-flex justify-content-center align-items-center"
                  onClick={() => (isInList ? "" : addToList(selectedMovie))}
                >
                  <i
                    className={`"bi ${
                      isInList ? "bi-check-lg text-danger" : "bi-plus-lg"
                    } fs-6 text-light"`}
                  ></i>
                </button>
                <button
                  type="button"
                  className="btn bg-dark rounded-circle d-flex justify-content-center align-items-center"
                >
                  <i className="bi bi-hand-thumbs-up fs-6 text-light"></i>
                </button>
              </div>
            </div>

            <section className="modal-body-container container-fluid d-lg-flex justify-content-between align-items-start px-lg-4">
              <div className="modal-body-container-first-child">
                <div className="d-flex justify-content-start align-items-center gap-4">
                  <p className="text-light fs-sml">
                    <strong>
                      {selectedMovie.release_date
                        ? selectedMovie.release_date.slice(0, 4)
                        : selectedMovie.first_air_date.slice(0, 4)}
                    </strong>
                  </p>
                  {selectedMovie.name ? (
                    <p className="text-light fs-sml">{selectedMovie.adult}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="text-light ff-head fs-sml wrap px-0">
                  <i className="bi bi-dot"></i>
                  {selectedMovie.title
                    ? selectedMovie.title
                    : selectedMovie.name}
                  <i className="bi bi-dot"></i>
                </div>

                <div className="d-flex justify-content-start align-items-center gap-lg-5 gap-3 mt-2">
                  <p className="text-secondary fs-sml ff-text d-flex justify-content-center align-items-baseline gap-2">
                    <strong>
                      <i className="text-secondary">Rating: </i>
                      ⭐️{Math.floor(selectedMovie.vote_average)}
                    </strong>
                  </p>
                  <p className="text-secondary fs-sml ff-text d-flex justify-content-center align-items-baseline">
                    <strong>
                      <i className="text-secondary">Genre:</i>
                    </strong>
                    {genreNames.length > 0 ? (
                      <span className="fs-sml text-light ff-text">
                        <i className="bi bi-dot"></i>
                        {genreNames.length > 1
                          ? genreNames[0] + ", " + genreNames[1]
                          : genreNames[0]}
                        <i className="bi bi-dot"></i>
                      </span>
                    ) : (
                      <span className="text-light text-center">
                        <i className="bi bi-dot"></i>
                        No genres!
                        <i className="bi bi-dot"></i>
                      </span>
                    )}
                  </p>
                </div>

                <div className="modal-body-overview">
                  <div className="modal-body-overview-most-liked d-flex align-items-baseline gap-2">
                    <button className="btn btn-danger rounded-2 btn-sml py-0 px-2">
                      <i className="bi bi-hand-thumbs-up-fill fs-sml"></i>
                    </button>
                    <h6 className="text-light ff-text">Most liked</h6>
                  </div>
                  <p className="fs-sml ff-text mt-2 my-1 w-50">
                    {showFull
                      ? selectedMovie.overview
                      : selectedMovie.overview.slice(0, 150) + "..."}
                  </p>

                  {selectedMovie.overview.length > 150 && (
                    <div className="d-flex justify-content-start align-items-center my-3">
                      <button
                        className="btn btn-danger btn-sml ff-text py-1 px-2 fs-sml border-0 modal-body-readmore-btn"
                        onClick={() => setShowFull(!showFull)}
                      >
                        {showFull ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <strong>
                  <div className="modal-body-cast fs-sml ff-text text-secondary">
                    <i>Cast: {"{...}"}</i>
                  </div>
                  <div className="modal-body-genres my-2 ff-text text-secondary fs-sml">
                    <i>
                      Genres:
                      {genreNames.length > 0 ? (
                        <span className="fs-sml ff-text">
                          <i className="bi bi-dot"></i>
                          {genreNames.length > 1
                            ? genreNames[0] + ", " + genreNames[1]
                            : genreNames[0]}
                          <i className="bi bi-dot"></i>
                        </span>
                      ) : (
                        <span className="text-light text-center">
                          <i className="bi bi-dot"></i>
                          No genres!
                          <i className="bi bi-dot"></i>
                        </span>
                      )}
                    </i>
                  </div>
                  <div className="modal-body-description ff-text text-secondary fs-sml ">
                    <i>This series is: {"{...}"}</i>
                  </div>
                </strong>
              </div>
            </section>

            <div className="modal-body-container-2 container-fluid px-lg-3">
              <div className="d-flex justify-content-between align-items-center mt-4">
                {selectedMovie.name ? (
                  <h3 className="ff-head fs-3 my-1 px-1">Episodes</h3>
                ) : (
                  <h3 className="ff-head fs-4 my-1 px-1">Watch</h3>
                )}

                {selectedMovie.name ? (
                  <button className="btn btm-sml btn-outline-secondary py-0 px-3 my-1 fs-sml text-light">
                    S1E01 <i className="bi bi-caret-down-fill fs-sml"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="modal-body-container-episodes container-fluid bg-dark">
                <div className="py-3 mt-2 text-light ff-text modal-body-overview-episodes-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
                    alt={
                      selectedMovie.title
                        ? selectedMovie.title
                        : selectedMovie.name
                    }
                    className="modal-body-overview-episodes-poster"
                  />
                  <p className="ff-text fs-sml mt-1">
                    {selectedMovie.overview.length > 150
                      ? selectedMovie.overview.slice(0, 150) + "..."
                      : selectedMovie.overview}
                  </p>
                  <button
                    className="btn btm-sml rounded-circle d-flex justify-content-center align-items-center modal-body-overview-episodes-btn"
                    type="button"
                  >
                    <i className="bi bi-play-fill text-light fs-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Search;
