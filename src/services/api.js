const API_KEY = "321841d429e87f1b3974706bb5cebbca";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await response.json();
  return data;
};

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const getAnimeShows = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP`
  );
  return response.json();
};

export const getAnimeMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&with_origin_country=JP`
  );
  return response.json();
};

export const getRandomMovie = async () => {
  try {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US$page=${randomPage}`
    );

    const data = await response.json();

    const movies = data.results;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  } catch (error) {
    console.error("Error fetching random movies", error);
    return null;
  }
};

export const getHorrorMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
  );
  return response.json();
};

export const getRomanceMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
  );
  return response.json();
};

export const getNetflixOnly = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`
  );
  return response.json();
};

export const getScifiMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`
  );
  return response.json();
};

export const getDramaSeries = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`
  );
  return response.json();
};

export const getAwardWinners = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000`
  );
  return response.json();
};

export const getHollyWoodMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=US`
  );
  return response.json();
};

export const getAdultAnimations = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=US`
  );
  return response.json();
};
