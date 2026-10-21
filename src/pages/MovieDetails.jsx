
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");

        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load movie details.");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMovie();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080D1A] p-10 text-center text-blue-400">
        Loading movie details...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#080D1A] p-10 text-center text-white">
        <p className="mb-6 text-red-400">
          {error || "Movie not found."}
        </p>

        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-[#080D1A] text-white">

      {/* Backdrop */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(to bottom, rgba(8,13,26,0.35), #080D1A), url(${backdrop})`
            : "linear-gradient(to bottom, #172744, #080D1A)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">

          <Link
            to="/"
            className="mb-10 inline-block text-blue-400 transition hover:text-blue-300"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">

            {/* Poster */}
            <div className="w-full shrink-0 md:w-72">
              {poster ? (
                <img
                  src={poster}
                  alt={`${movie.title} poster`}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-[#10182A] text-gray-400">
                  No poster available
                </div>
              )}
            </div>

            {/* Movie Information */}
            <div className="flex-1">

              <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-blue-400">
                MOVIE DETAILS
              </p>

              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mb-5 italic text-gray-400">
                  {movie.tagline}
                </p>
              )}

              <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-300">
                <span>
                  {movie.release_date || "Release date unavailable"}
                </span>

                <span>•</span>

                <span>
                  {movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}
                </span>

                <span>•</span>

                <span className="text-blue-400">
                  ★ {movie.vote_average?.toFixed(1) ?? "N/A"}
                </span>
              </div>

              {/* Genres */}
              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h2 className="mb-3 text-xl font-semibold">
                Overview
              </h2>

              <p className="max-w-2xl leading-8 text-gray-300">
                {movie.overview || "No overview available."}
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
