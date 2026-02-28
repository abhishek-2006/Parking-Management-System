import { useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <div className="w-5 h-5 bg-white rounded-full" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Smart<span className="text-blue-600">Park</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8 text-gray-600 font-semibold">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `pb-1 transition ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Controls */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold transition"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition">
            <FaUserCircle className="text-2xl text-gray-600" />
          </div>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b shadow-xl py-6 z-10 md:hidden">

          <ul className="flex flex-col space-y-6 text-center text-gray-700 font-bold">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-1 ${
                    isActive ? "text-blue-600 underline" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-4 px-6">
            <button
              onClick={logout}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
