import { NavLink, Link } from "react-router-dom";

function Navbar() {
const linkClass = ({ isActive }) =>
`transition hover:text-blue-400 ${
      isActive ? "text-blue-400" : "text-gray-300"
    }`;

return ( <nav className="flex w-full items-center justify-between border-b border-white/10 bg-[#080D1A]/95 px-4 py-4 backdrop-blur-md sm:px-6 md:px-8">
{/* Logo */} <Link
     to="/"
     className="shrink-0 text-xl font-bold tracking-wide sm:text-2xl md:text-3xl"
   >
Cine<span className="text-blue-400">Scope</span> </Link>
  {/* Navigation Links */}
  <div className="flex items-center gap-4 text-sm sm:gap-6 md:gap-8">
    <NavLink to="/" end className={linkClass}>
      Home
    </NavLink>

    <NavLink to="/favorites" className={linkClass}>
      <span className="hidden sm:inline">My Favorites</span>
      <span className="sm:hidden">♥</span>
    </NavLink>
  </div>
</nav>

);
}

export default Navbar;
