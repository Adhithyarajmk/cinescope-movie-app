import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

function MovieCard({ id, title, rating, year, poster }) {
const { isFavorite, toggleFavorite } = useFavorites();

const movie = {
id,
title,
vote_average: Number(rating),
release_date: year !== "N/A" ? `${year}-01-01` : "",
poster_path: poster
? poster.replace("https://image.tmdb.org/t/p/w500", "")
: null,
};

const favorite = isFavorite(id);

function handleFavoriteClick(event) {
event.preventDefault();
event.stopPropagation();
toggleFavorite(movie);
}

return (
<Link
to={`/movie/${id}`}
className="group block overflow-hidden rounded-xl border border-white/10 bg-[#10182A] transition duration-300 hover:-translate-y-2 hover:border-blue-500/50"
> <div className="relative aspect-[2/3] overflow-hidden bg-[#172744]">
{poster ? (
<img
src={poster}
alt={`${title} poster`}
className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
loading="lazy"
/>
) : ( <div className="flex h-full items-center justify-center p-4 text-center text-gray-400">
No poster available </div>
)}

    {/* Favorites button */}
    <button
      type="button"
      onClick={handleFavoriteClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove from Favorites" : "Add to Favorites"}
      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl backdrop-blur-sm transition hover:scale-110"
    >
      <span className={favorite ? "text-red-500" : "text-white"}>
        {favorite ? "♥" : "♡"}
      </span>
    </button>
  </div>

  <div className="p-4">
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="text-xs text-gray-400">{year}</span>
      <span className="text-xs text-blue-400">★ {rating}</span>
    </div>

    <h3 className="truncate font-semibold text-white" title={title}>
      {title}
    </h3>
  </div>
</Link>

);
}

export default MovieCard;
