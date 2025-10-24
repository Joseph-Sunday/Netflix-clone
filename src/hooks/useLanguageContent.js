import { useState, useEffect } from "react";
import { fetchSeries } from "../services/api";

// Shuffle Array (of Movies)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function useLanguageContent(language) {
  const [content, setContent] = useState({
    trending: [],
    action: [],
    romance: [],
    series: [],
    topRated: [],
    anime: [],
    comedy: [],
    actionSeries: [],
    romanceSeries: [],
    animeSeries: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trending,
          action,
          romance,
          series,
          topRated,
          anime,
          comedy,
          actionSeries,
          romanceSeries,
          animeSeries,
        ] = await Promise.all([
          fetchSeries(
            `/discover/tv?with_original_language=${language}&with_genres=10765&sort_by=popularity.desc`
          ),
          // Action
          fetchSeries(
            `/discover/tv?with_networks=213&with_original_language=${language}&with_genres=10759&sort_by=popularity.desc`
          ),
          // Romance
          fetchSeries(
            `/discover/tv?with_original_language=${language}&with_genres=10765&sort_by=popularity.desc`
          ),
          // Series
          fetchSeries(`/discover/tv?with_original_language=${language}`),
          // Top Rated
          fetchSeries(
            `/discover/movie?with_original_language=${language}&sort_by=vote_average.desc&vote_count.gte=100`
          ),
          //   Anime
          fetchSeries(
            `/discover/movie?with_original_language=${language}&with_genres=16&sort_by=popularity.desc`
          ),
          //   Comedy
          fetchSeries(
            `/discover/movie?with_original_language=${language}&with_genres=35&sort_by=popularity.desc`
          ),
          //   Action Series
          fetchSeries(
            `/discover/tv?with_original_language=${language}&with_genres=10759&sort_by=popularity.desc`
          ),
          //   Romance Series
          fetchSeries(
            `/discover/tv?with_original_language=${language}&with_genres=10749&sort_by=popularity.desc`
          ),
          //   Anime Series
          fetchSeries(
            `/discover/tv?with_original_language=${language}&with_genres=16&sort_by=popularity.desc`
          ),
        ]);

        console.log("Fetched Movies successfully");

        setContent({
          trending: shuffleArray(trending.results || []),
          action: shuffleArray(action.results || []),
          romance: shuffleArray(romance.results || []),
          series: shuffleArray(series.results || []),
          topRated: shuffleArray(topRated.results || []),
          anime: shuffleArray(anime.results || []),
          comedy: shuffleArray(comedy.results || []),
          actionSeries: shuffleArray(actionSeries.results || []),
          romanceSeries: shuffleArray(romanceSeries.results || []),
          animeSeries: shuffleArray(animeSeries.results || []),
        });
      } catch (error) {
        console.error("Error fetching language content", error);
      }
    };

    fetchData();
  }, [language]);

  return content;
}

export default useLanguageContent;
