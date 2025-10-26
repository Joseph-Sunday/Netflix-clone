import { GENRES } from "../constants/genres";

export function getGenreNames(genreIds) {
  return genreIds
    .map((id) => GENRES.find((genre) => genre.id === id)?.name)
    .filter(Boolean);
}
