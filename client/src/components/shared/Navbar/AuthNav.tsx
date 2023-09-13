import { Link, useLocation } from "react-router-dom";
import { User } from "../../../types/types";

interface PropTypes {
  user: User;
}

export default function AuthNav({ user }: PropTypes) {
  const location = useLocation();
  const isActive = location.pathname === "/projects";

  return (
    <div className="flex justify-between align-items  flex-grow">
      <Link to="/projects">
        <button
          className={`rounded ml-10 py-2 px-4 text-lg font-semibold ${
            isActive ? "text-sky-500" : "hover:text-sky-500 text-slate-200"
          }`}
        >
          Projects
        </button>
      </Link>
      <Link
        to="/projects"
        className="text-white align-middle flex items-center"
      >
        <button className="rounded-full bg-sky-600 hover:bg-sky-600/80 text-slate-100 p-2 font-bold text-sm ">
          {user?.firstName ? user.firstName[0] : "B"}
          {user?.lastName ? user.lastName[0] : "M"}
        </button>
      </Link>
    </div>
  );
}
