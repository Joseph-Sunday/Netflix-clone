
export function mapMovieData(item, genresList = []) {
  const isMovie = !!item.title; // Movies have "title", TV shows have "name"

  // Convert genre_ids -> genre names
  const genreNames = item.genre_ids
    ? item.genre_ids
        .map((id) => {
          const g = genresList.find((genre) => genre.id === id);
          return g ? g.name : null;
        })
        .filter(Boolean)
    : [];

  return {
    id: item.id,
    title: item.title || item.name, // Works for both movies & TV
    poster: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : null,
    backdrop: item.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      : null,
    rating: item.vote_average ? item.vote_average.toFixed(1) : "N/A", // ⭐ score
    genres: genreNames, // Array of strings → ["Action", "Drama"]
    releaseDate: item.release_date || item.first_air_date || "Unknown",
    overview: item.overview || "No description available.",
    type: isMovie ? "movie" : "series",
    runtime: isMovie ? item.runtime : null, // Movies only
    episodes: !isMovie ? item.number_of_episodes : null, // TV only (if detailed API)
    seasons: !isMovie ? item.number_of_seasons : null, // TV only
  };
}
