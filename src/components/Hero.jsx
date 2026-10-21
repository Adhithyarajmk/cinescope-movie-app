function Hero() {
  return (
    <section className="relative overflow-hidden px-8 py-24 md:px-16">

      {/* Blue Glow */}
      <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative max-w-3xl">

        <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-blue-400">
          YOUR WORLD OF CINEMA
        </p>

        <h2 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl">
          Find Your Next
          <br />
          <span className="text-blue-400">
            Favorite Story.
          </span>
        </h2>

        <p className="mb-9 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
          Explore unforgettable movies, discover hidden gems,
          and find something extraordinary to watch tonight.
        </p>

        <button className="rounded-lg bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500">
          Explore Movies
        </button>

      </div>
    </section>
  );
}

export default Hero;