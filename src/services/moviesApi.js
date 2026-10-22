
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

// Fetch popular movies
export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  return data.results;
}

// Search movies by title
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();

  return data.results;
}

// Fetch movie trailers
export async function getMovieTrailers(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie trailers");
  }

  const data = await response.json();

  // Find a YouTube trailer
  const trailer = data.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true
  );

  // If no official trailer exists, find any YouTube trailer
  if (!trailer) {
    return data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) || null;
  }

  return trailer;
}
