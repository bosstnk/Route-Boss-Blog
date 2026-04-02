import { Link } from "react-router-dom";
import NavbarRight from "./NavBarRight";

function NavBar() {
  return (
    <nav
      className="
        flex items-center justify-between
        w-full
        py-3 px-6 lg:py-4 lg:px-[120px]
        sticky top-0 z-50
        bg-base-brown-100
        border-b border-b-base-brown-300
      "
    >
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-2xl font-bold lg:text-4xl"
      >
        Boss<span className="text-green-400">.</span>
      </Link>

      <NavbarRight />
    </nav>
  );
}

export default NavBar;