import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { User } from "../../../types/types";
import NoAuthNav from "./NoAuthNav";
import AuthNav from "./AuthNav";

const logoStyle: Object = {
  "--fa-primary-color": "rgb(139 92 246)",
  "--fa-secondary-color": "rgb(56 189 248)",
  "--fa-primary-opacity": "1",
  "--fa-secondary-opacity": "1",
};

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const user: User | null = authContext?.user ?? null;

  return (
    <nav className="py-4">
      <div className="flex container w-full mx-auto justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-3xl">
            <div className="font-bold inline-block text-slate-50 ">
              Workshop
            </div>
          </Link>
        </div>

        {user ? <AuthNav user={user} /> : <NoAuthNav />}
      </div>
    </nav>
  );
};

export default Navbar;
