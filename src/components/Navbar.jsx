
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition hover:text-blue-400 ${
      isActive ? "text-blue-400" : "text-gray-300"
    }`;

  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide md:text-3xl">
        Cine<span className="text-blue-400">Scope</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden items-center gap-8 text-sm md:flex">

        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/favorites" className={linkClass}>
          My Favorites
        </NavLink>

      </div>

      {/* Mobile Favorites Link */}
      <Link
        to="/favorites"
        className="text-sm text-blue-400 transition hover:text-blue-300 md:hidden"
      >
        Favorites
      </Link>

    </nav>
  );
}

export default Navbar;
