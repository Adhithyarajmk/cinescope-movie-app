
import { Link } from "react-router-dom";

function Favorites() {
  return (
    <div className="min-h-screen bg-[#080D1A] px-6 py-12 text-white md:px-16">

      <Link
        to="/"
        className="mb-8 inline-block text-blue-400 hover:text-blue-300"
      >
        ← Back to Home
      </Link>

      <h1 className="mb-3 text-4xl font-bold">
        My Favorites
      </h1>

      <p className="text-gray-400">
        Your favorite movies will appear here.
      </p>

    </div>
  );
}

export default Favorites;
