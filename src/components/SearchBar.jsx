function SearchBar() {
  return (
    <section className="px-8 md:px-16">

      <div className="flex max-w-2xl items-center gap-3 rounded-xl border border-white/10 bg-[#10182A] px-5 py-4 transition focus-within:border-blue-500">

        <span className="text-xl text-blue-400">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search movies, actors, or genres..."
          className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
        />

        <span className="hidden text-xs text-gray-500 sm:block">
          SEARCH
        </span>

      </div>

    </section>
  );
}

export default SearchBar;