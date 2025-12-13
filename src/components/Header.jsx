import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import GradientText from "./GradientText";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between border-b border-white/20 backdrop-blur-md relative z-20">
      {/* Hamburger for mobile */}
      <div className="flex sm:hidden absolute right-5 top-5">
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-7 h-7 text-slate-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {/* LEFT — Logo */}

      <h1 className="font-bold text-3xl tracking-tight">Hola!</h1>

      {/* CENTER — Navigation */}
      <nav
        className={`flex-col sm:flex-row flex gap-5 sm:gap-10 text-xs sm:text-sm font-medium text-slate-800 bg-white sm:bg-transparent rounded-xl px-4 py-2 sm:p-0 absolute sm:static w-5/6 sm:w-auto left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 top-16 sm:top-auto transition-all duration-300 shadow-xl sm:shadow-none border sm:border-0 border-slate-200 sm:border-none z-10 ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <Link to="/" className="hover:text-slate-600 transition">
          Home
        </Link>
        <Link to="/projects" className="hover:text-slate-600 transition">
          Projects
        </Link>
        <Link to="/contact" className="hover:text-slate-600 transition">
          Contact
        </Link>

        {/* Shiny Collab Button */}
        <Link to="/collaborate">
          <GradientText
            colors={["#ffcc00", "#ff018f", "#2a0c62", "#11012e"]}
            animationSpeed={1}
            showBorder={false}
            className="custom-class"
          >
            Collaborate
          </GradientText>
        </Link>
      </nav>

      {/* RIGHT — Social Icons */}
      <div className="flex items-center gap-3 sm:gap-4 text-slate-800 text-lg mt-3 sm:mt-0">
        <Link
          to="https://github.com/kanishq-17"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="hover:text-slate-600 transition cursor-pointer" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/kanishqsodhani"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="hover:text-slate-600 transition cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
