import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";

const logoStyle: Object = {
  "--fa-primary-color": "rgb(139 92 246)",
  "--fa-secondary-color": "rgb(56 189 248)",
  "--fa-primary-opacity": "1",
  "--fa-secondary-opacity": "1",
};

const Navbar = () => {
  return (
    <nav className="py-6">
      <div className="flex md:justify-between container w-full mx-auto justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <FontAwesomeIcon
              icon={faScrewdriverWrench}
              style={logoStyle}
              className="mr-3 text-2xl"
            />
            <div className="font-bold inline-block text-slate-50 text-xl">
              Workshop
            </div>
          </Link>
        </div>

        <div className="flex">
          <Link
            to="/login"
            className="text-white align-middle flex items-center"
          >
            <button className="rounded hover:text-sky-500 text-slate-100 py-2 px-4 mr-2 text-md font-semibold">
              Login
            </button>
          </Link>
          <Link
            to="/register"
            className="text-white align-middle flex items-center"
          >
            <button className="rounded bg-sky-600 hover:bg-sky-600/80 text-slate-100 py-2 px-4 text-md font-semibold">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
