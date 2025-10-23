import "../css/BrowseByLanguage.css";
import MovieCard from "./MovieCard";
import { useSeries } from "../hooks/useSeries";
import { useFilms } from "../hooks/useFilms";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useList } from "../context/ListContext";
import { fetchSeries } from "../services/api";

// Shuffle Array (of Movies)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const BrowseByLanguage = () => {
  // Langauge State
  const [language, setLanguage] = useState("en");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchSeries(
        `/discover/movie?with_original_language=${language}`
      );
      setResults(shuffleArray(data.results));
    };

    getMovies();
  }, [language]);

  // Fetch movies
  const { popular, trending, topRated, action, romance, netflix } = useFilms();
  // Fetch series
  const { netflixAnime, netflixTrending, anime } = useSeries();

  // Movie Modal state
  const [selectedMovie, setSelectedMovie] = useState(null);
  // Show full text in modal
  const [showFull, setShowFull] = useState(false);

  // My List State
  const { addToList, removeFromList, myList } = useList();
  const isInList = myList.some((item) => item.id === selectedMovie?.id);

  return (
    <>
      <section className="">
        <div className="container-fluid mt-5 p-4 d-md-flex justify-content-between align-items-center flex-wrap">
          <h1 className="text-light ff-head mx-lg-4">Browse by Langauge</h1>

          <div className=" d-md-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            <div className="d-md-flex justify-content-center align-items-baseline gap-2">
              <p className="text-light ff-text fs-sml m-0">
                Select your preferences
              </p>
              <div class="btn-group mt-1">
                <select
                  className="btn btn-sm text-light border rounded-0 fs-sml"
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                >
                  <option value="en">English</option>
                  <option value="ko">Korean</option>
                  <option value="hi">Hindi</option>
                  <option value="ja">Japanese</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>

            <div class="btn-group mt-1 d-flex justify-items-center align-items-center">
              <select className="btn btn-sm text-light border rounded-0 fs-sml">
                <option value="en">English Au</option>
                <option value="ko">Korean Au</option>
                <option value="hi">Hindi Au</option>
                <option value="ja">Japanese Au</option>
                <option value="es">Spanish Au</option>
              </select>
            </div>

            <div className="d-md-flex justify-content-center align-items-baseline gap-2">
              <p className="text-light ff-text fs-sml m-0 mt-1">Sort by</p>
              <div class="btn-group mt-1">
                <select className="btn btn-sm text-light border rounded-0 fs-sml">
                  <option value="en">Series</option>
                  <option value="ko">Films</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

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

            <section className="modal-body-container container-fluid d-md-flex justify-content-between align-items-start gap-5 px-lg-3">
              <div className="">
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

                <div className="modal-head-title text-light ff-head fs-sml wrap px-0">
                  <i className="bi bi-dot"></i>
                  {selectedMovie.title
                    ? selectedMovie.title
                    : selectedMovie.name}
                  <i className="bi bi-dot"></i>
                </div>

                <div className="d-flex justify-content-start align-items-center gap-5 mt-2">
                  <p className="text-secondary fs-sml ff-text d-flex justify-content-center align-items-baseline gap-2">
                    <strong>
                      <i className="text-secondary">Rating: </i>
                      ⭐️{Math.floor(selectedMovie.vote_average)}
                    </strong>
                  </p>
                  <p className="text-secondary fs-sml ff-text d-flex justify-content-center align-items-baseline gap-2">
                    <strong>
                      <i className="text-secondary">Genre: </i>"
                      {selectedMovie.genre_ids.join("", "").slice(0, 3)}"
                    </strong>
                  </p>
                </div>

                <div className="modal-body-overview">
                  <div className="modal-body-overview-most-liked d-flex align-items-baseline gap-2">
                    <button className="btn btn-danger rounded-2 btn-sml py-0 px-2">
                      <i className="bi bi-hand-thumbs-up-fill fs-sml"></i>
                    </button>
                    <h6 className="text-light ff-text">Most liked</h6>
                  </div>
                  <p className="fs-sml ff-text mt-2 my-1">
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
              <div className="mt-1">
                <div className="modal-body-cast fs-sml ff-text text-secondary">
                  <i>Cast: {"{...}"}</i>
                </div>
                <div className="modal-body-genres my-2 ff-text text-secondary fs-sml">
                  <i>Genres: {"{...}"}</i>
                </div>
                <div className="modal-body-description ff-text text-secondary fs-sml ">
                  <i>This series is: {"{...}"}</i>
                </div>
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

      {/* Filter results Films */}
      <div className=" container-fluid">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {results.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Filter results Films */}
      <div className=" container-fluid">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {results.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Trending Films */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {trending.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Top Rated Films */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {topRated.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Netflix Films */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {netflix.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Netflix Trending series */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {netflixTrending.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Action Films */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {action.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Romance Films */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {romance.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Netflix Anime */}
      <div className=" container-fluid mt-4">
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {netflixAnime.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseByLanguage;
