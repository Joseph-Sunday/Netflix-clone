import "../css/App.css";
import { getRandomMovie } from "../services/api";
import { useState, useEffect } from "react";
import BigMovieCard from "../components/BigMovieCard";
import MovieCard from "../components/MovieCard";
import TopTenMovieCard from "../components/TopTenMovieCard";
import { useFilms } from "../hooks/useFilms";
import { useList } from "../context/ListContext";
import { Modal } from "react-bootstrap";

const Films = () => {
  // Fetch Random Movie
  const [randomMovie, setRandomMovie] = useState(null);
  const [randomMovieError, setRandomMovieError] = useState(null);
  const [randomMovieLoading, setRandomMovieLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const randomMovie = await getRandomMovie();
        console.log("fetched Random Movie:", randomMovie);
        setRandomMovie(randomMovie);
      } catch (err) {
        console.log(randomMovieError);
        setRandomMovieError("failed to fetch random movie");
      } finally {
        setRandomMovieLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  // Fetched Films from useFilms Hook
  const {
    popular,
    topRated,
    trending,
    upcoming,
    nowPlaying,
    trendingThisWeek,
    action,
    romance,
    horror,
    netflix,
  } = useFilms();

  // Selected Movie (Modal)
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Show Full Text
  const [showFull, setShowFull] = useState(false);

  // My list
  const { addToList, removeFromList, myList } = useList();
  const isInList = myList.some((item) => item.id === selectedMovie?.id);

  return (
    <>
      {/* Random Movie */}
      <div>
        {randomMovieLoading ? (
          <p className="fs-sml text-center text-light">Loading..</p>
        ) : randomMovieError ? (
          <p>{randomMovieError}</p>
        ) : (
          <BigMovieCard movie={randomMovie} />
        )}
      </div>

      {/* Popular Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Popular Films
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {popular.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

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
                  onClick={() =>
                    isInList
                      ? ""
                      : addToList(selectedMovie)
                  }
                >
                  <i
                    className={`"bi ${
                      isInList ? "bi-check-lg text-danger" : "bi-plus-lg"
                    }fs-6 text-light"`}
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

      {/* Trending Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
          Trending Today
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {trending.slice(0, 10).map((film, index) => (
            <TopTenMovieCard movie={film} key={film.id} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Top Rated Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Top Rated
        </h6>
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

      {/* Now Playing Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Now In Theaters
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {nowPlaying.map((film) => (
            <MovieCard
              movie={film}
              key={film.id}
              showBanner={Math.random() < 0.4}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Coming to Theaters
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {upcoming.map((film) => (
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
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Action Packed
        </h6>
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

      {/* Trending This Week */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
          Trending This Week
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {trendingThisWeek.slice(0, 10).map((film, index) => (
            <TopTenMovieCard movie={film} key={film.id} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Horror Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Horror
        </h6>
        <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
          {horror.map((film) => (
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
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Romance
        </h6>
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

      {/* Netflix Films */}
      <div className="px-lg-5">
        <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
          Only on Netflix
        </h6>
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
    </>
  );
};

export default Films;
