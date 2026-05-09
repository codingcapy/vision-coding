import { Link } from "@tanstack/react-router";
import logo from "/logo_alpha.png";
import { PiCaretDownBold } from "react-icons/pi";

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
          <div className="hidden md:flex px-3 mx-10 cursor-pointer items-center hover:text-blue-500 transition-all ease-in-out duration-300">
            <div className="mr-1">Programs</div>
            <PiCaretDownBold />
          </div>
          <Link
            to="/login"
            className="bg-blue-500 rounded-full px-3 py-1 font-semibold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
