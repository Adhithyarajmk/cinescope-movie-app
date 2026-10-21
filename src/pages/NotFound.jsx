
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080D1A] px-6 text-center text-white">
      <h1 className="mb-4 text-7xl font-bold text-blue-400">
        404
      </h1>

      <h2 className="mb-3 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mb-8 text-gray-400">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
