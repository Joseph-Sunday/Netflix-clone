import "../css/BrowseByLanguage.css";
import MovieCard from "../components/MovieCard";
import SkeletonMovieCard from "../components/SkeletonMovieCard";
import useLanguageContent from "../hooks/useLanguageContent";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useList } from "../context/ListContext";
import { LANGUAGES } from "../data/languages";
import { getGenreNames } from "../utils/getGenreNames";

const BrowseByLanguage = () => {
  // Langauge State
  const [language, setLanguage] = useState("en");
  const { content } = useLanguageContent(language);

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
              <div className="btn-group mt-1">
                <select
                  className="btn btn-sm text-light border rounded-0 fs-sml"
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                >
                  {LANGUAGES.map((lang) => (
                    <option value={lang.code} key={lang.code}>
                      {lang.name}
                    </option>
                  ))}
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
                <select className="btn btn-sm text-light border rounded-0 fs-sml">
                  <option value="en">Series</option>
                  <option value="ko">Films</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <Section title="Trending" items={content.trending} />
        <Section title="Action" items={content.action} />
        <Section title="Romance" items={content.romance} />
        <Section title="Series" items={content.series} />
        <Section title="TopRated" items={content.topRated} />
        <Section title="TopRated" items={content.anime} />
        <Section title="TopRated" items={content.comedy} />
        <Section title="TopRated" items={content.actionSeries} />
        <Section title="TopRated" items={content.romanceSeries} />
        <Section title="TopRated" items={content.animeSeries} />
      </section>
    </>
  );
};

function Section({ title, items }) {
  const { loading } = useLanguageContent();
  // Selected movie onClick
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Show full text
  const [showFull, setShowFull] = useState(false);
  useEffect(() => {
    if (selectedMovie) {
      setShowFull(false);
    }
  }, [selectedMovie]);

  // Close Modal
  const handleOnHide = () => {
    document
      .querySelectorAll(".movie-card")
      .forEach((card) => card.classList.remove("hovered"));

    setShowFull(false);
    setSelectedMovie(null);
  };

  // My List State
  const { addToList, removeFromList, myList } = useList();
  const isInList = myList.some((item) => item.id === selectedMovie?.id);

  // Genre Names
  let genreNames = getGenreNames(selectedMovie?.genre_ids || []);
  genreNames = genreNames.flatMap((name) =>
    name.split(",").map((g) => g.trim())
  );

  return (
    <>
      {/* Movie Details Modal */}
      {selectedMovie && (
        <Modal
          show={true}
          onHide={handleOnHide}
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

      {loading ? (
        <div className="px-lg-5">
          <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonMovieCard key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      ) : (
        <div className=" container-fluid">
          <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
            {items.length > 0 ? (
              items.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))
            ) : (
              <p className="text-secondary text-center fs-sml">
                No results found!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BrowseByLanguage;
