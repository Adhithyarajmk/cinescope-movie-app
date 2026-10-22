
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import {
  getPopularMovies,
  searchMovies,
} from "../services/moviesApi";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

const filteredMovies = movies.filter((movie) => {
  return (
    selectedGenre === "All" ||
    movie.genre_ids?.includes(Number(selectedGenre))
  );
});

  // Fetch popular movies when the page loads
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  // Live search with a small delay
  useEffect(() => {
    const query = search.trim();

    // Show popular movies when the search box is empty
    if (!query) {
      async function fetchPopular() {
        try {
          setLoading(true);
          setError("");

          const data = await getPopularMovies();
          setMovies(data);
        } catch (err) {
          setError(err.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }

      fetchPopular();
      return;
    }

    // Wait briefly before calling the API
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query);
        setMovies(data);
      } catch (err) {
        setError(err.message || "Search failed.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <section
  id="movies"
  className="px-4 py-10 sm:px-6 sm:py-12 lg:px-16 lg:py-16"
>

      {/* Heading */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-blue-400">
          HANDPICKED FOR YOU
        </p>

        <h2 className="text-3xl font-bold">
          {search.trim() ? "Search Results" : "Popular Movies"}
        </h2>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex max-w-2xl items-center gap-3 rounded-xl border border-white/10 bg-[#10182A] px-5 py-4 transition focus-within:border-blue-500">

        <span className="text-xl text-blue-400">
          ⌕
        </span>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search any movie..."
          className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Clear
          </button>
        )}

      </div>
      {/* Genre Filter */}

<div className="mb-8 flex flex-wrap items-center gap-3">
  <label htmlFor="genre" className="text-sm font-medium text-gray-300">
    Filter by Genre:
  </label>

<select
id="genre"
value={selectedGenre}
onChange={(event) => setSelectedGenre(event.target.value)}
className="rounded-lg border border-white/10 bg-[#10182A] px-4 py-3 text-white outline-none transition focus:border-blue-500"

>


<option value="All">All Genres</option>

{genres.map((genre) => (
  <option key={genre.id} value={genre.id}>
    {genre.name}
  </option>
))}

  </select>

{selectedGenre !== "All" && (
<button
onClick={() => setSelectedGenre("All")}
className="text-sm text-blue-400 transition hover:text-blue-300"
>
Reset </button>
)}

</div>

      {/* Loading */}
      {loading && (
        <p className="py-12 text-center text-blue-400">
          Searching movies...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-12 text-center">
          <p className="mb-4 text-red-400">{error}</p>

          <button
            onClick={() => setSearch((value) => value)}
            className="rounded-lg bg-blue-600 px-5 py-2 transition hover:bg-blue-500"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && (
        filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">

        
{filteredMovies.map((movie) => (
  <MovieCard
    key={movie.id}
    id={movie.id}
    title={movie.title}
    rating={
      typeof movie.vote_average === "number"
        ? movie.vote_average.toFixed(1)
        : "N/A"
    }
    year={movie.release_date?.slice(0, 4) || "N/A"}
    poster={
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null
    }
  />
))}


          </div>
        ) : (
          <p className="py-12 text-center text-gray-400">
            No movies found. Try another title.
          </p>
        )
      )}

    </section>
  );
}

export default MovieList;

