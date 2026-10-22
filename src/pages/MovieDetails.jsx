import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieTrailers } from "../services/moviesApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();  //It creates an object that can cancel certain operations, including a fetch() request.

    async function fetchMovie() {
      try {
        setLoading(true); 
        setError("");
        setMovie(null);
        setTrailer(null);
        setShowTrailer(false);

        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );

        if (!movieResponse.ok) {
          throw new Error("Unable to load movie details.");
        }

        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch the movie trailer
        const trailerData = await getMovieTrailers(id);

        if (!controller.signal.aborted) {
          setTrailer(trailerData);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
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
      <div className="flex min-h-screen items-center justify-center bg-[#080D1A] px-4 text-center text-blue-400">
        Loading movie details...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#080D1A] px-4 text-center text-white">
        <p className="mb-6 text-red-400">
          {error || "Movie not found."}
        </p>

        <Link
          to="/"
          className="text-blue-400  transition hover:text-blue-300"
        >
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
    <div className="min-h-screen overflow-hidden bg-[#080D1A] text-white">
      {/* Backdrop */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(to bottom, rgba(8,13,26,0.35), #080D1A), url(${backdrop})`
            : "linear-gradient(to bottom, #172744, #080D1A)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-16">
          {/* Back Navigation */}
          <Link
            to="/"
            className="mb-8 inline-block text-sm text-blue-400 transition hover:text-blue-300 sm:mb-10 sm:text-base"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col gap-7 sm:gap-9 md:flex-row md:items-start md:gap-8 lg:gap-12">
            {/* Poster */}
            <div className="mx-auto w-full max-w-[240px] shrink-0 sm:max-w-[280px] md:mx-0 md:w-[35%] md:max-w-[320px] lg:w-[30%]">
              {poster ? (
                <img
                  src={poster}
                  alt={`${movie.title} poster`}
                  className="aspect-[2/3] w-full rounded-xl object-cover shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-[#10182A] text-gray-400">
                  No poster available
                </div>
              )}
            </div>

            {/* Movie Information */}
            <div className="min-w-0 flex-1">
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-400 sm:text-sm sm:tracking-[0.25em]">
                MOVIE DETAILS
              </p>

              <h1 className="mb-4 break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mb-5 text-sm italic text-gray-400 sm:text-base">
                  {movie.tagline}
                </p>
              )}

              {/* Rating and Release Information */}
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-300 sm:text-sm">
                <span>
                  {movie.release_date || "Release date unavailable"}
                </span>

                <span className="hidden sm:inline">•</span>

                <span>
                  {movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}
                </span>

                <span className="hidden sm:inline">•</span>

                <span className="text-blue-400">
                  ★ {movie.vote_average?.toFixed(1) ?? "N/A"}
                </span>
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <h2 className="mb-3 text-lg font-semibold sm:text-xl">
                Overview
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                {movie.overview || "No overview available."}
              </p>

              {/* Watch Trailer Button */}
              <div className="mt-7">
                {trailer ? (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#080D1A]"
                  >
                    <span aria-hidden="true">▶</span>
                    Watch Trailer
                  </button>
                ) : (
                  <p className="text-sm text-gray-400">
                    No trailer available for this movie.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
          onClick={() => setShowTrailer(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${movie.title} trailer`}
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {movie.title} — Trailer
              </h2>

              <button
                onClick={() => setShowTrailer(false)}
                aria-label="Close trailer"
                className="rounded-full bg-white/10 px-3 py-2 text-xl text-white transition hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                title={`${movie.title} official trailer`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
              Click outside the player or press the close button to exit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
