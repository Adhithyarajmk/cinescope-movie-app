import Header from "../components/Header";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#080D1A] text-white">

      <Header />

      <main>
        <Hero />
        <MovieList />
      </main>

      <Footer />

    </div>
  );
}

export default Home;