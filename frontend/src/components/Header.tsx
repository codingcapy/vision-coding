import { Link } from "@tanstack/react-router";
import logo from "/logo_alpha.png";
import { PiCaretDownBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";

type MenuMode = "none" | "programs" | "more";

export function Header() {
  const [showNav, setShowNav] = useState(false);
  const [menuMode, setMenuMode] = useState("none");
  const menuRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuMode("none");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen p-2 bg-[#0a0a0ac3] text-white z-50">
      <div className="max-w-[1300px] flex justify-between items-center mx-auto">
        <Link
          to="/"
          onClick={() => setShowNav(false)}
          className="flex items-center cursor-pointer"
        >
          <img src={logo} alt="" className="w-[40px] mr-2" />
          <div className="font-bold">
            Vision <span className="text-yellow-500">Coding</span>{" "}
            <span className="hidden md:inline">Academy</span>
          </div>
        </Link>
        <div ref={menuRef} className="relative hidden md:flex items-center">
          <div
            onClick={() => setMenuMode("programs")}
            className="flex cursor-pointer items-center hover:text-blue-500 transition-all ease-in-out duration-300"
          >
            <div className="mr-1">Programs</div>
            <PiCaretDownBold />
          </div>
          <div
            onClick={() => setMenuMode("more")}
            className="flex mx-10 cursor-pointer items-center hover:text-blue-500 transition-all ease-in-out duration-300"
          >
            <div className="mr-1">More</div>
            <PiCaretDownBold />
          </div>
          <Link
            to="/login"
            onClick={() => setMenuMode("none")}
            className="bg-blue-500 rounded-full px-3 py-1 font-semibold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300"
          >
            Sign in
          </Link>
          {menuMode === "more" && (
            <div className="absolute px-3 top-[40px] right-[110px] bg-[#0a0a0ac3] flex flex-col">
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                About us
              </Link>
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                Contact
              </Link>
            </div>
          )}
          {menuMode === "programs" && (
            <div className="absolute px-3 top-[40px] right-[210px] bg-[#0a0a0ac3] flex flex-col">
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 w-[80px] hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                All courses
              </Link>
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                Python
              </Link>
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                Frontend
              </Link>
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                Backend
              </Link>
              <Link
                to="/"
                onClick={() => setMenuMode("none")}
                className="py-2 hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                Full stack
              </Link>
            </div>
          )}
        </div>
        <div onClick={() => setShowNav(!showNav)} className="md:hidden">
          <GiHamburgerMenu size={25} />
        </div>
      </div>
      {showNav && (
        <div className="md:hidden fixed top-[60px] left-0 w-screen text-center flex flex-col bg-[#0a0a0ac3]">
          <Link to="/" onClick={() => setShowNav(false)} className="py-2">
            Programs
          </Link>
          <Link to="/" onClick={() => setShowNav(false)} className="py-2">
            About us
          </Link>
          <Link to="/" onClick={() => setShowNav(false)} className="py-2">
            Contact
          </Link>
          <Link
            to="/login"
            onClick={() => setShowNav(false)}
            className="bg-blue-500 py-2"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
