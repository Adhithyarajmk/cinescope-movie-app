
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";

function Home() {
  return (
    <div className="min-h-screen bg-[#080D1A] text-white">

      <main>
        <Hero />
        <MovieList />
      </main>


    </div>
  );
}

export default Home;