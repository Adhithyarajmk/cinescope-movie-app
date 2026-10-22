function Hero() {
return ( <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-16 md:py-24">

  {/* Blue Glow */}
  <div className="pointer-events-none absolute -right-20 -top-10 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl sm:-right-10 sm:h-72 sm:w-72 md:right-0 md:-top-20 md:h-80 md:w-80" />

  <div className="relative max-w-3xl">

    {/* Eyebrow Text */}
    <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-400 sm:mb-5 sm:text-sm sm:tracking-[0.3em]">
      YOUR WORLD OF CINEMA
    </p>

    {/* Main Heading */}
    <h2 className="mb-5 text-4xl leading-tight font-bold tracking-tight sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
      Find Your Next
      <br />
      <span className="text-blue-400">
        Favorite Story.
      </span>
    </h2>

    {/* Description */}
    <p className="mb-7 max-w-xl text-sm leading-6 text-gray-400 sm:mb-9 sm:text-base sm:leading-7 md:text-lg">
      Explore unforgettable movies, discover hidden gems,
      and find something extraordinary to watch tonight.
    </p>

    {/* Explore Button */}
    <button
      onClick={() =>
        document.getElementById("movies")?.scrollIntoView({
          behavior: "smooth",
        })
      }
      className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 sm:px-7 sm:py-3.5 sm:text-base"
    >
      Explore Movies
    </button>

  </div>
</section>
);
}

export default Hero;
