import { Link } from "react-router-dom";

export default function NoAuthNav() {
  return (
    <div className="flex gap-2">
      <Link to="/login" className="text-white align-middle flex items-center">
        <button className="rounded hover:text-sky-500 text-slate-100 py-2 px-4 text-md font-semibold">
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
  );
}
