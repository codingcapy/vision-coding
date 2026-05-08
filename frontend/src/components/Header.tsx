import logo from "/logo_alpha.png";

export function Header() {
  return (
    <div className="fixed top-0 left-0 w-screen p-2 bg-[#0a0a0ac3] text-white">
      <div className="flex items-center">
        <img src={logo} alt="" className="w-[40px] mr-2" />
        <div>Vision Coding Academy</div>
      </div>
    </div>
  );
}
