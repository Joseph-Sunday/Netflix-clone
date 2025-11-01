import { useEffect, useState } from "react";
import { getRandomSeries } from "../services/api";
import BigMovieCard from "../components/BigMovieCard";
import MovieCard from "../components/MovieCard";
import TopTenMovieCard from "../components/TopTenMovieCard";
import { useSeries } from "../hooks/useSeries";
import { useList } from "../context/ListContext";
import { getGenreNames } from "../utils/getGenreNames";
import { Modal } from "react-bootstrap";
import "../css/App.css";
import "../css/MovieCardModal.css";

const Series = () => {
  // Fetch Random Series
  const [randomSeries, setRandomSeries] = useState(null);
  const [randomSeriesError, setRandomSeriesError] = useState(null);
  const [randomSeriesLoading, setRandomSeriesLoading] = useState(true);

  useEffect(() => {
    const fetchRandomSeries = async () => {
      try {
        const randomSeries = await getRandomSeries();
        console.log("fetched random series:", randomSeries);
        setRandomSeries(randomSeries);
      } catch (err) {
        console.log(randomSeriesError);
        setRandomSeriesError("failed to fetch random series");
      } finally {
        setRandomSeriesLoading(false);
      }
    };

    fetchRandomSeries();
  }, []);

  // Fetched Series from useSeries hook
  const {
    popular,
    trending,
    topRated,
    airingToday,
    discover,
    airing,
    anime,
    netflixAnime,
    netflix,
    netflixTrending,
  } = useSeries();

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

  // My List
  const { addToList, removeFromList, myList } = useList();
  const isInList = myList.some((item) => item.id === selectedMovie?.id);

  // Genre Names
  let genreNames = getGenreNames(selectedMovie?.genre_ids || []);
  genreNames = genreNames.flatMap((name) =>
    name.split(",").map((g) => g.trim())
  );

  return (
    <>
      {/* Random Series */}
      <div>
        {randomSeriesLoading ? (
          <p className="fs-sml text-center text-light">Loading..</p>
        ) : randomSeriesError ? (
          <p>{randomSeriesError}</p>
        ) : (
          <BigMovieCard movie={randomSeries} onClick={setSelectedMovie} />
        )}
      </div>

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
      {/* Popular Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Popular Tv Series
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {popular.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Top Rated Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Top-Rated Series
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {topRated.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Trending Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
          Trending in Nigeria
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {trending.slice(0, 9).map((series, index) => (
            <TopTenMovieCard movie={series} key={series.id} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Airing Today Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Airing Shows
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {airingToday.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Recommended Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Recommended Series
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {discover.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Airing Now Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Follow Up
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {airing.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Anime Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Anime Series
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {anime.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Netflix Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Only On Netflix
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {netflix.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Netflix Trending Series */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
          Trending on Netflix
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {netflixTrending.slice(0, 9).map((series, index) => (
            <TopTenMovieCard movie={series} key={series.id} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Netflix Anime */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Netflix Anime
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {netflixAnime.map((series) => (
            <MovieCard
              movie={series}
              key={series.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Series;
