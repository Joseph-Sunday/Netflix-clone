import { useEffect, useState } from "react";
import { getRandomSeries } from "../services/api";
import BigMovieCard from "../components/BigMovieCard";
import MovieCard from "../components/MovieCard";
import TopTenMovieCard from "../components/TopTenMovieCard";
import { useSeries } from "../hooks/useSeries";

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

  return (
    <>
      {/* Random Series */}
      <div>
        {randomSeriesLoading ? (
          <p className="fs-sml text-center text-light">Loading..</p>
        ) : randomSeriesError ? (
          <p>{randomSeriesError}</p>
        ) : (
          <BigMovieCard movie={randomSeries} />
        )}
      </div>

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
          {trending.slice(0, 10).map((series, index) => (
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
          {netflixTrending.slice(0, 10).map((series, index) => (
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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Series;
