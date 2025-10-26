import { useState, useEffect } from "react";
import { fetchSeries } from "../services/api";

const GENRES = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  SciFi: 878,
  Thriller: 53,
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function useSmartRecommendations(type = "movie", genre = "") {
  const [contentPages, setContentPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const genreId = GENRES[genre] || "";
    const getEndpoint = (page) => {
      const base =
        type === "movie"
          ? `/discover/movie?sort_by=popularity.desc`
          : `/discover/tv?sort_by=popularity.desc`;
      return `${base}${genreId ? `&with_genres=${genreId}` : ""}&page=${page}`;
    };

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const pagesToFetch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const results = await Promise.all(
          pagesToFetch.map(async (p) => {
            const data =
              type === "movie"
                ? await fetchSeries(getEndpoint(p))
                : await fetchSeries(getEndpoint(p));
            return data.results || [];
          })
        );

        console.log("response", results);
        setContentPages(shuffleArray(results));
      } catch (error) {
        console.error("failed to fetch recommendations", error);
        setContentPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [type, genre]);

  return { contentPages, loading };
}
