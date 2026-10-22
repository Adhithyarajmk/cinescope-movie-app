import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
const [favorites, setFavorites] = useState(() => {
try {
const savedFavorites = localStorage.getItem("cinescope-favorites");
return savedFavorites ? JSON.parse(savedFavorites) : [];
} catch {
return [];
}
});

useEffect(() => {
localStorage.setItem("cinescope-favorites", JSON.stringify(favorites));
}, [favorites]);

function addFavorite(movie) {
setFavorites((currentFavorites) => {
const alreadyExists = currentFavorites.some(
(favorite) => favorite.id === movie.id
);

  if (alreadyExists) {
    return currentFavorites;
  }

  return [...currentFavorites, movie];
});

}

function removeFavorite(movieId) {
setFavorites((currentFavorites) =>
currentFavorites.filter((movie) => movie.id !== movieId)
);
}

function isFavorite(movieId) {
return favorites.some((movie) => movie.id === movieId);
}

function toggleFavorite(movie) {
if (isFavorite(movie.id)) {
removeFavorite(movie.id);
} else {
addFavorite(movie);
}
}

return (
<FavoritesContext.Provider
value={{
favorites,
addFavorite,
removeFavorite,
isFavorite,
toggleFavorite,
}}
>
{children}
</FavoritesContext.Provider>
);
}

export function useFavorites() {
return useContext(FavoritesContext);
}
