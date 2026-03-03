import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center transition-colors">
      {/* Brand Section */}
      <div className="flex items-center gap-2">
        <img src="/src/assets/favicon.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Smart<span className="text-blue-600">Park</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8 text-gray-600 dark:text-gray-300 font-semibold">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={({ isActive }) => `pb-1 transition ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Profile Section */}
      <div className="relative flex items-center gap-4">
        <div 
          onClick={() => setProfileOpen(!profileOpen)}
          className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition"
        >
          <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-300" />
        </div>

        {/* Profile Dropdown */}
        {profileOpen && (
          <div className="absolute right-0 top-full mt-3 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
            <button 
              onClick={() => { navigate("/settings"); setProfileOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              <FaCog className="text-blue-500" /> Settings
            </button>
            <hr className="my-1 border-gray-100 dark:border-slate-800" />
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl text-gray-700 dark:text-gray-300" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 py-6 md:hidden">
          <ul className="flex flex-col space-y-4 px-6 font-bold text-gray-700 dark:text-gray-200">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "text-blue-600" : "")}>
                {item.name}
              </NavLink>
            ))}
            <button onClick={logout} className="w-full bg-red-500 text-white py-3 rounded-xl">Logout</button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;