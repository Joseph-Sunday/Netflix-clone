import { useEffect, useState } from "react";
import { fetchSeries } from "../services/api";

// Shuffle Array (of series)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function useSeries() {
  const [series, setSeries] = useState({
    popular: [],
    trending: [],
    topRated: [],
    airingToday: [],
    discover: [],
    airing: [],
    anime: [],
    netflixAnime: [],
    netflix: [],
    netflixTrending: [],
  });

  useEffect(() => {
    const getSeries = async () => {
      try {
        const [
          popularSeries,
          trendingSeries,
          topRatedSeries,
          airingToday,
          recommendedSeries,
          airingNow,
          animeSeries,
          netflixAnimeSeries,
          netflixSeries,
          netflixTrendingSeries,
        ] = await Promise.all([
          fetchSeries("/tv/popular"),
          fetchSeries("/trending/tv/week"),
          fetchSeries("/tv/top_rated"),
          fetchSeries("/tv/airing_today"),
          fetchSeries("/discover/tv"),
          fetchSeries("/tv/on_the_air"),
          // Anime Series
          fetchSeries("/discover/tv?with_genres=16&with_original_language=ja"),
          // Netflix Anime
          fetchSeries("/discover/tv?with_networks=213&with_genres=16"),
          // Netflix Series
          fetchSeries("/discover/tv?with_networks=213"),
          // Trending Netflix
          fetchSeries("/discover/tv?with_networks=213&sort_by=popularity.desc"),
        ]);

        // Logging fetched data
        console.log("netflix trending:", netflixTrendingSeries.results);

        setSeries({
          popular: shuffleArray(popularSeries.results),
          trending: shuffleArray(trendingSeries.results),
          topRated: shuffleArray(topRatedSeries.results),
          airingToday: shuffleArray(airingToday.results),
          discover: shuffleArray(recommendedSeries.results),
          airing: shuffleArray(airingNow.results),
          anime: shuffleArray(animeSeries.results),
          netflixAnime: shuffleArray(netflixAnimeSeries.results),
          netflix: shuffleArray(netflixSeries.results),
          netflixTrending: shuffleArray(netflixTrendingSeries.results),
        });
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    getSeries();
  }, []);

  return series;
}
