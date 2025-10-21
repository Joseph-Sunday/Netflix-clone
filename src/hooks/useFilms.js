import { fetchSeries } from "../services/api";
import { useState, useEffect } from "react";

// Shuffle Array (of series)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function useFilms() {
  const [films, setFilms] = useState({
    popular: [],
    topRated: [],
    trending: [],
    upcoming: [],
    nowPlaying: [],
    trendingThisWeek: [],
    action: [],
    horror: [],
    romance: [],
    netflix: [],
  });

  useEffect(() => {
    const getFilms = async () => {
      try {
        const [
          popularFilms,
          topRatedFilms,
          trendingFilms,
          upcomingFilms,
          nowPlayingFilms,
          trendingThisWeekFilms,
          actionFilms,
          horrorFilms,
          romanceFilms,
          netflixFilms,
        ] = await Promise.all([
          fetchSeries("/movie/popular"),
          fetchSeries("/movie/top_rated"),
          fetchSeries("/trending/movie/day"),
          fetchSeries("/movie/upcoming"),
          fetchSeries("/movie/now_playing"),
          fetchSeries("/trending/movie/week"),
          fetchSeries("/discover/movie?with_genres=28"),
          fetchSeries("/discover/movie?with_genres=27"),
          fetchSeries(
            "/discover/movie?with_networks=213&with_genres=10749&sort_by=popularity.desc"
          ),
          fetchSeries(
            "/discover/movie?with_networks=213&sort_by=popularity.desc"
          ),
        ]);

        // Log fetched data
        console.log("popular films:", popularFilms.results);

        setFilms({
          popular: shuffleArray(popularFilms.results),
          topRated: shuffleArray(topRatedFilms.results),
          trending: shuffleArray(trendingFilms.results),
          upcoming: shuffleArray(upcomingFilms.results),
          nowPlaying: shuffleArray(nowPlayingFilms.results),
          trendingThisWeek: shuffleArray(trendingThisWeekFilms.results),
          action: shuffleArray(actionFilms.results),
          horror: shuffleArray(horrorFilms.results),
          romance: shuffleArray(romanceFilms.results),
          netflix: shuffleArray(netflixFilms.results),
        });
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    getFilms();
  }, []);

  return films;
}
