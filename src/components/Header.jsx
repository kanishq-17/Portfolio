import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import GradientText from "./GradientText";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-white/20 backdrop-blur-md">
      {/* LEFT — Logo */}

      <h1 className="font-bold text-3xl tracking-tight">Hola!</h1>

      {/* CENTER — Navigation */}
      <nav className="flex items-center gap-10 text-sm font-medium text-slate-800">
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
      <div className="flex items-center gap-4 text-slate-800 text-lg">
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
