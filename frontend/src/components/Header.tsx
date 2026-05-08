import { Link } from "@tanstack/react-router";
import logo from "/logo_alpha.png";

export function Header() {
  return (
    <div className="fixed top-0 left-0 w-screen p-2 bg-[#0a0a0ac3] text-white z-50">
      <div className="max-w-[1300px] flex justify-between items-center mx-auto">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="" className="w-[40px] mr-2" />
          <div className="font-bold">
            Vision <span className="text-yellow-500">Coding</span>{" "}
            <span className="hidden md:inline">Academy</span>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="hidden md:block px-3 mx-10 cursor-pointer">
            Courses
          </div>
          <Link
            to="/login"
            className="bg-blue-500 rounded-full px-3 py-1 font-semibold cursor-pointer"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
