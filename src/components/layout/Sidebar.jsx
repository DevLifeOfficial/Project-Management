import { NavLink } from "react-router-dom";
import { Home, Folder, CheckSquare, CirclePile, FileBraces,Focus } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-20 bg-white flex flex-col items-center justify-between py-6 space-y-8
      transform transition-transform duration-300 ease-in-out shadow-md
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Logo */}
      <div className="w-15 h-15">
        <img
          src="/logo.png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center space-y-6">
        <NavItem to="/" icon={<Home size={22} />} />
        <NavItem to="/project" icon={<Folder size={22} />} />
        <NavItem to="/task" icon={<CirclePile size={22} />} />
        <NavItem to="/status" icon={<FileBraces size={22} />} />
        <NavItem to="/Focus" icon={<CheckSquare size={22} />} />
        <NavItem to="/Alert" icon={<Focus size={22} />} />
      </nav>


      {/* profile */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600 font-medium border-2 border-gray-400 cursor-pointer">
        JD
      </div>

    </aside>
  );
}

function NavItem({ to, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-3 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-gray-800 text-cyan-400"
            : "text-black hover:bg-gray-800 hover:text-gray-300"
        }`
      }
    >
      {icon}
    </NavLink>
  );
}
