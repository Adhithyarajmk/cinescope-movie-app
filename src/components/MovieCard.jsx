
import { Link } from "react-router-dom";

function MovieCard({ id, title, rating, year, poster }) {
  return (
    <Link
      to={`/movie/${id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#10182A] transition duration-300 hover:-translate-y-2 hover:border-blue-500/50"
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3] overflow-hidden bg-[#172744]">
        {poster ? (
          <img
            src={poster}
            alt={`${title} poster`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-gray-400">
            No poster available
          </div>
        )}
      </div>

      {/* Movie Information */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400">{year}</span>

          <span className="text-xs text-blue-400">
            ★ {rating}
          </span>
        </div>

        <h3 className="truncate font-semibold text-white" title={title}>
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default MovieCard;
