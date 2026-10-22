import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoriteContext";

function Favorites() {
const { favorites } = useFavorites();

return ( <div className="min-h-screen bg-[#080D1A] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-16 lg:py-12"> <div className="mb-10"> <Link
       to="/"
       className="mb-6 inline-block text-sm text-blue-400 transition hover:text-blue-300"
     >
← Back to Home </Link>

    <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-blue-400">
      YOUR PERSONAL COLLECTION
    </p>

    <h1 className="text-4xl font-bold">
      My Favorites <span className="text-red-500">♥</span>
    </h1>

    <p className="mt-3 text-gray-400">
      {favorites.length}{" "}
      {favorites.length === 1 ? "movie" : "movies"} saved
    </p>
  </div>

  {favorites.length > 0 ? (
    <div className="grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {favorites.map((movie) => (
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
              ? movie.poster_path.startsWith("http")
                ? movie.poster_path
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null
          }
        />
      ))}
    </div>
  ) : (
    <div className="rounded-2xl border border-white/10 bg-[#10182A] px-6 py-16 text-center">
      <div className="mb-4 text-6xl text-red-500">♡</div>

      <h2 className="mb-3 text-2xl font-semibold">
        No favorites yet
      </h2>

      <p className="mx-auto mb-6 max-w-md text-gray-400">
        Discover movies you love and save them here by clicking the heart
        icon on a movie poster.
      </p>

      <Link
        to="/"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Explore Movies
      </Link>
    </div>
  )}
</div>
);
}

export default Favorites;
