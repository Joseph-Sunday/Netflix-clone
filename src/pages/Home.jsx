import "../css/App.css";
import BigMovieCard from "../components/BigMovieCard";
import MovieCard from "../components/MovieCard";
import {
  getRandomMovie,
  getPopularMovies,
  getAnimeShows,
  getAnimeMovies,
  getHorrorMovies,
  getRomanceMovies,
  getNetflixOnly,
  getScifiMovies,
  getDramaSeries,
  getAwardWinners,
  getHollyWoodMovies,
  getAdultAnimations,
  getTrendingToday,
  getTrendingTvShows,
  getTrendingThisWeek,
  getPopularTvShows,
  getUpcomingMovies,
} from "../services/api";
import { useEffect, useState } from "react";
import TopTenMovieCard from "../components/TopTenMovieCard";
import { Modal } from "react-bootstrap";
import "../css/MovieCardModal.css";

// Shuffle Array (of Movies)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const Home = () => {
  // Fetch Random Movie
  const [movie, setMovie] = useState(null);
  const [randomMovieError, setRandomMovieError] = useState(null);
  const [randomMovieLoading, setRandomMovieLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const randomMovie = await getRandomMovie();
        console.log("fetched random movie:", randomMovie);
        setMovie(randomMovie);
      } catch (error) {
        console.log(randomMovieError);
        setRandomMovieError("failed to load movie..");
      } finally {
        setRandomMovieLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  // Fetch Popular Movies
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularMoviesError, setPopularMoviesError] = useState(null);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("popular movies fetched:", popularMovies);
        setPopularMovies(shuffleArray(popularMovies));
      } catch (err) {
        console.log(err);
        setPopularMoviesError("movies failed to load");
      } finally {
        setPopularMoviesLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // Fetch Anime Shows
  const [animeShows, setAnimeShows] = useState([]);
  const [animeShowsError, setAnimeShowsError] = useState(null);
  const [animeShowsLoading, setAnimeShowsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeShows = async () => {
      try {
        const animeShows = await getAnimeShows();
        console.log("anime shows:", animeShows);
        setAnimeShows(shuffleArray(animeShows.results || []));
      } catch (err) {
        console.log("failed to fetch anime shows", err);
        setAnimeShowsError("failed to fetch anime shows:");
      } finally {
        setAnimeShowsLoading(false);
      }
    };

    fetchAnimeShows();
  }, []);

  // Fetch Anime Movies
  const [animeMovies, setAnimeMovies] = useState([]);
  const [animeMoviesError, setAnimeMoviesError] = useState(null);
  const [animeMoviesLoading, setAnimeMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeMovies = async () => {
      try {
        const animeMovies = await getAnimeMovies();
        console.log("anime Movies:", animeMovies);
        setAnimeMovies(shuffleArray(animeMovies.results || []));
      } catch (err) {
        console.log("failed to fetch anime movies", err);
        setAnimeMoviesError("failed to fetch anime movies:");
      } finally {
        setAnimeMoviesLoading(false);
      }
    };

    fetchAnimeMovies();
  }, []);

  // Fetch Horror Movies
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [horrorMoviesError, setHorrorMoviesError] = useState(null);
  const [horrorMoviesLoading, setHorrorMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchHorrorMovies = async () => {
      try {
        const horrorMovies = await getHorrorMovies();
        console.log("Horror Movies:", horrorMovies);
        setHorrorMovies(shuffleArray(horrorMovies.results || []));
      } catch (err) {
        console.log("failed to fetch horror movies", err);
        setHorrorMoviesError("failed to fetch horror movies:");
      } finally {
        setHorrorMoviesLoading(false);
      }
    };

    fetchHorrorMovies();
  }, []);

  // Fetch Romance Movies
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [romanceMoviesError, setRomanceMoviesError] = useState(null);
  const [romanceMoviesLoading, setRomanceMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchRomanceMovies = async () => {
      try {
        const romanceMovies = await getRomanceMovies();
        console.log("Romance Movies", romanceMovies);
        setRomanceMovies(shuffleArray(romanceMovies.results || []));
      } catch (err) {
        console.log("failed to fetch romance movies:", err);
        setRomanceMoviesError("Failed to fetch romance movies");
      } finally {
        setRomanceMoviesLoading(false);
      }
    };

    fetchRomanceMovies();
  }, []);

  // Fetch Netflix Only Movies
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [netflixMoviesError, setNetflixMoviesError] = useState(null);
  const [netflixMoviesLoading, setNetflixMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchNetflixMovies = async () => {
      try {
        const netflixMovies = await getNetflixOnly();
        console.log("Netflix Movies", netflixMovies);
        setNetflixMovies(shuffleArray(netflixMovies.results || []));
      } catch (err) {
        console.log("failed to fetch netflix movies:", err);
        setNetflixMoviesError("Failed to fetch netflix movies");
      } finally {
        setNetflixMoviesLoading(false);
      }
    };

    fetchNetflixMovies();
  }, []);

  // Fetch Sci-Fi Movies
  const [scifiMovies, setScifiMovies] = useState([]);
  const [scifiMoviesError, setScifiMoviesError] = useState(null);
  const [scifiMoviesLoading, setScifiMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchScifiMovies = async () => {
      try {
        const scifiMovies = await getScifiMovies();
        console.log("Sci-fi Movies", scifiMovies);
        setScifiMovies(shuffleArray(scifiMovies.results || []));
      } catch (err) {
        console.log("failed to fetch scifi movies:", err);
        setScifiMoviesError("Failed to fetch scifi movies");
      } finally {
        setScifiMoviesLoading(false);
      }
    };

    fetchScifiMovies();
  }, []);

  // Fetch Drama Series
  const [dramaSeries, setDramaSeries] = useState([]);
  const [dramaSeriesError, setDramaSeriesError] = useState(null);
  const [dramaSeriesLoading, setDramaSeriesLoading] = useState(true);

  useEffect(() => {
    const fetchDramaSeries = async () => {
      try {
        const dramaSeries = await getDramaSeries();
        console.log("Drama Series", dramaSeries);
        setDramaSeries(shuffleArray(dramaSeries.results || []));
      } catch (err) {
        console.log("failed to fetch drama series:", err);
        setDramaSeriesError("Failed to fetch drama series");
      } finally {
        setDramaSeriesLoading(false);
      }
    };

    fetchDramaSeries();
  }, []);

  // Fetch Award Winning Movies
  const [awardWinners, setAwardWinners] = useState([]);
  const [awardWinnersError, setAwardWinnersError] = useState(null);
  const [awardWinnersLoading, setAwardWinnersLoading] = useState(true);

  useEffect(() => {
    const fetchAwardWinners = async () => {
      try {
        const awardWinners = await getAwardWinners();
        console.log("Award winning movies:", awardWinners);
        setAwardWinners(shuffleArray(awardWinners.results || []));
      } catch (err) {
        console.log("failed to fetch award winners:", err);
        setAwardWinnersError("Failed to fetch award winning movies");
      } finally {
        setAwardWinnersLoading(false);
      }
    };

    fetchAwardWinners();
  }, []);

  // Fetch Hollywood Movies
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [hollywoodMoviesError, setHollywoodMoviesError] = useState(null);
  const [hollywoodMoviesLoading, setHollywoodMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchHollywoodMovies = async () => {
      try {
        const hollywoodMovies = await getHollyWoodMovies();
        console.log("Hollywood movies:", hollywoodMovies);
        setHollywoodMovies(shuffleArray(hollywoodMovies.results || []));
      } catch (err) {
        console.log("failed to fetch hollywood Movies:", err);
        setHollywoodMoviesError("Failed to fetch Hollywood movies");
      } finally {
        setHollywoodMoviesLoading(false);
      }
    };

    fetchHollywoodMovies();
  }, []);

  // Fetch Adult Animations
  const [adultAnimations, setAdultAnimations] = useState([]);
  const [adultAnimationsError, setAdultAnimationsError] = useState(null);
  const [adultAnimationsLoading, setAdultAnimationsLoading] = useState(true);

  useEffect(() => {
    const fetchAdultAnimations = async () => {
      try {
        const adultAnimations = await getAdultAnimations();
        console.log("Adult Animations:", adultAnimations);
        setAdultAnimations(shuffleArray(adultAnimations.results || []));
      } catch (err) {
        console.log("failed to fetch adult animations:", err);
        setAdultAnimationsError("Failed to fetch Adult animations");
      } finally {
        setAdultAnimationsLoading(false);
      }
    };

    fetchAdultAnimations();
  }, []);

  // Fetch Trending Movies
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesError, setTrendingMoviesError] = useState(null);
  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMovies = await getTrendingToday();
        console.log("Fetched Trending Movies:", trendingMovies);
        setTrendingMovies(shuffleArray(trendingMovies.results || []));
      } catch (err) {
        console.log("failed to fetch Trending Movies:", err);
        setTrendingMoviesError("failed to fetch Trending Movies");
      } finally {
        setTrendingMoviesLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Fetch Trending Tv Shows
  const [trendingShows, setTrendingShows] = useState([]);
  const [trendingShowsError, setTrendingShowsError] = useState(null);
  const [trendingShowsLoading, setTrendingShowsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      try {
        const trendingShows = await getTrendingTvShows();
        console.log("Fetched Trending TV Shows:", trendingShows);
        setTrendingShows(shuffleArray(trendingShows.results || []));
      } catch (err) {
        console.log("failed to fetch Trending Movies:", err);
        setTrendingShowsError("failed to fetch Trending Movies");
      } finally {
        setTrendingShowsLoading(false);
      }
    };

    fetchTrendingShows();
  }, []);

  // Fetch Trending This Week
  const [trendingThisWeek, setTrendingThisWeek] = useState([]);
  const [trendingThisWeekError, setTrendingThisWeekError] = useState(null);
  const [trendingThisWeekLoading, setTrendingThisWeekLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingThisWeek = async () => {
      try {
        const trendingThisWeek = await getTrendingThisWeek();
        console.log("Fetched Trending This Week:", trendingThisWeek);
        setTrendingThisWeek(shuffleArray(trendingThisWeek.results || []));
      } catch (err) {
        console.log("failed to fetch Trending This Week:", err);
        setTrendingShowsError("failed to fetch Trending This Week");
      } finally {
        setTrendingThisWeekLoading(false);
      }
    };

    fetchTrendingThisWeek();
  }, []);

  // Fetch Popular Tv Shows
  const [popularShows, setPopularShows] = useState([]);
  const [popularShowsError, setPopularShowsError] = useState(null);
  const [popularShowsLoading, setPopularShowsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularShows = async () => {
      try {
        const popularShows = await getPopularTvShows();
        console.log("Fetched Popular Shows:", popularShows);
        setPopularShows(shuffleArray(popularShows.results || []));
      } catch (err) {
        console.log("failed to fetch Popular Shows:", err);
        setPopularShowsError("failed to fetch Trending This Week");
      } finally {
        setPopularShowsLoading(false);
      }
    };

    fetchPopularShows();
  }, []);

  // Fetch Upcoming Movies
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingMoviesError, setUpcomingMoviesError] = useState(null);
  const [upcomingMoviesLoading, setUpcomingMoviesLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcomingMovies = await getUpcomingMovies();
        console.log("Fetched Upcoming Movies:", upcomingMovies);
        setUpcomingMovies(shuffleArray(upcomingMovies.results || []));
      } catch (err) {
        console.log("failed to fetch Upcoming Movies:", err);
        setUpcomingMoviesError("failed to fetch Upcoming Movies");
      } finally {
        setUpcomingMoviesLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  // Selected movie onClick
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Show full text
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      {/* Random Movie */}
      <div>
        {randomMovieLoading ? (
          <div className="Loading text-center ff-text rounded-0">
            Loading...
          </div>
        ) : randomMovieError ? (
          <p>{randomMovieError}</p>
        ) : (
          <BigMovieCard movie={movie} />
        )}
      </div>

      {/* Popular Movies */}
      <div>
        {popularMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading popular movies...
          </p>
        ) : popularMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{popularMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-3 mt-4 fs-sml fs-lg-movie-card">
              We think you'll love this
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {popularMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
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
                >
                  <i className="bi bi-plus-lg fs-6 text-light"></i>
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
                      <i className="text-secondary">Genre: </i>
                      "{selectedMovie.genre_ids.join("", "").slice(0, 3)}"
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

      {/* Anime Shows */}
      <div>
        {animeShowsLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading anime shows...
          </p>
        ) : animeShowsError ? (
          <p className="text-danger mt-lg fs-sml">{animeShowsError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Anime Shows
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {animeShows.map((show) => (
                <MovieCard
                  movie={show}
                  key={show.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Horror Movies */}
      <div>
        {horrorMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading horror shows...
          </p>
        ) : horrorMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{horrorMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Because you watched Conjuring
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {horrorMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Anime Movies */}
      <div>
        {animeMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading anime movies...
          </p>
        ) : animeMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{animeMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Anime movies
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {animeMovies.map((anime) => (
                <MovieCard
                  movie={anime}
                  key={anime.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Movies */}
      <div>
        {trendingMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Trending Movies..
          </p>
        ) : trendingMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{trendingMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Trending in Nigeria
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {trendingMovies.slice(0, 10).map((movie, index) => (
                <TopTenMovieCard
                  movie={movie}
                  key={movie.id}
                  rank={index + 1}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Romance Movies */}
      <div>
        {romanceMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading romance movies...
          </p>
        ) : romanceMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{romanceMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Can be very captivating
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {romanceMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Netflix Only */}
      <div>
        {netflixMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Netflix movies...
          </p>
        ) : netflixMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{netflixMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Only on Netflix
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {netflixMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sci-fi Movies */}
      <div>
        {scifiMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Sci-fi movies...
          </p>
        ) : scifiMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{scifiMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Sci-fi Drama
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {scifiMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drama Series */}
      <div>
        {dramaSeriesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Drama series...
          </p>
        ) : dramaSeriesError ? (
          <p className="text-danger mt-lg fs-sml">{dramaSeriesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Drama series
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {dramaSeries.map((series) => (
                <MovieCard
                  movie={series}
                  key={series.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Tv Shows */}
      <div>
        {trendingShowsLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading..
          </p>
        ) : trendingShowsError ? (
          <p className="text-danger mt-lg fs-sml">{trendingShowsError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Trending Shows
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {trendingShows.slice(0, 10).map((shows, index) => (
                <TopTenMovieCard
                  movie={shows}
                  key={shows.id}
                  rank={index + 1}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Award Winning Movies */}
      <div>
        {awardWinnersLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Award winners...
          </p>
        ) : awardWinnersError ? (
          <p className="text-danger mt-lg fs-sml">{awardWinnersError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Award Winners
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {awardWinners.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hollywood Movies */}
      <div>
        {hollywoodMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Hollywood movies...
          </p>
        ) : hollywoodMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{hollywoodMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Holloywood Blockbusters
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {hollywoodMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Adult Animations */}
      <div>
        {adultAnimationsLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading Adult Animations...
          </p>
        ) : adultAnimationsError ? (
          <p className="text-danger mt-lg fs-sml">{adultAnimationsError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Adult Animations
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {adultAnimations.map((animation) => (
                <MovieCard
                  movie={animation}
                  key={animation.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Popular Tv Shows */}
      <div>
        {popularShowsLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading...
          </p>
        ) : popularShowsError ? (
          <p className="text-danger mt-lg fs-sml">{popularShowsError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Popular Tv Shows
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {popularShows.map((shows) => (
                <MovieCard
                  movie={shows}
                  key={shows.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending This Week */}
      <div>
        {trendingThisWeekLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading..
          </p>
        ) : trendingThisWeekError ? (
          <p className="text-danger mt-lg fs-sml">{trendingThisWeekError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Trending This Week
            </h6>
            <div className="container-fluid my-2 d-flex gap-2 scroll-container">
              {trendingThisWeek.slice(0, 10).map((movie, index) => (
                <TopTenMovieCard
                  movie={movie}
                  key={movie.id}
                  rank={index + 1}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Movies */}
      <div>
        {upcomingMoviesLoading ? (
          <p className="text-center text-light mt-lg fs-sml ff-text">
            Loading...
          </p>
        ) : upcomingMoviesError ? (
          <p className="text-danger mt-lg fs-sml">{upcomingMoviesError}</p>
        ) : (
          <div className="px-lg-5">
            <h6 className="card-title text-light ff-text mx-4 mt-2 mt-lg-4 fs-sml fs-lg-movie-card">
              Upcoming
            </h6>
            <div className="container-fluid my-2 d-flex overflow-auto gap-2 scroll-container">
              {upcomingMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  showBanner={Math.random() < 0.4}
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
