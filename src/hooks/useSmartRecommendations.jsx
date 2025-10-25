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

export function useSmartRecommendations(type, genre) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const genreId = GENRES[genre];
        let response;

        if (type === "movie") {
          response = await fetchSeries(
            `/discover/movie?sort_by=popularity.desc${
              genreId ? `&with_genres=${genreId}` : ""
            }`
          );
        } else {
          response = await fetchSeries(
            `/discover/tv?sort_by=popularity.desc${
              genreId ? `&with_genres=${genreId}` : ""
            }`
          );
        }

        console.log("response", response.results);
        setContent(response.results || []);
      } catch (error) {
        console.error("failed to fetch recommendations", error);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [type, genre]);

  return { content, loading };
}
