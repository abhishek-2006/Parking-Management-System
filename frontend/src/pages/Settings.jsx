import Navbar from "../components/Navbar";
import { FaUserCog, FaBell, FaShieldAlt, FaSave, FaLock, FaMoon } from "react-icons/fa";

const Settings = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50/50">
        <Navbar />

        <main className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                System Settings
            </h1>
            <p className="text-slate-500 font-medium mt-1">
                Customize your account and system preferences
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Sidebar */}
            <div className="space-y-4">
                <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6">
                <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                    <FaUserCog className="text-cyan-600" /> Profile Settings
                </h2>

                <div className="mt-4 space-y-3 text-sm font-medium text-slate-600">
                    <button className="w-full text-left px-4 py-2 rounded-xl bg-cyan-50 text-cyan-700 font-bold">
                    Account
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-slate-50">
                    Notifications
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-slate-50">
                    Security
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-slate-50">
                    System Preferences
                    </button>
                </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-6">

                {/* Account Section */}
                <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6">
                <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-800">
                    <FaUserCog className="text-cyan-600" />
                    Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div>
                    <label className="text-sm font-bold text-slate-600">Full Name</label>
                    <input className="w-full mt-1 p-3 rounded-xl border border-slate-300 focus:border-cyan-500 outline-none" placeholder="Admin User" />
                    </div>

                    <div>
                    <label className="text-sm font-bold text-slate-600">Email</label>
                    <input className="w-full mt-1 p-3 rounded-xl border border-slate-300 focus:border-cyan-500 outline-none" placeholder="admin@system.com" />
                    </div>
                </div>

                <button className="mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-95 transition flex items-center gap-2">
                    <FaSave /> Save Changes
                </button>
                </div>

                {/* Security Section */}
                <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6">
                <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-800">
                    <FaLock className="text-rose-600" />
                    Security Settings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div>
                    <label className="text-sm font-bold text-slate-600">Current Password</label>
                    <input type="password" className="w-full mt-1 p-3 rounded-xl border border-slate-300 focus:border-cyan-500 outline-none" />
                    </div>

                    <div>
                    <label className="text-sm font-bold text-slate-600">New Password</label>
                    <input type="password" className="w-full mt-1 p-3 rounded-xl border border-slate-300 focus:border-cyan-500 outline-none" />
                    </div>
                </div>

                <button className="mt-6 bg-gradient-to-r from-rose-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-95 transition">
                    Update Password
                </button>
                </div>

                {/* Preferences */}
                <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6">
                <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-800">
                    <FaShieldAlt className="text-green-600" />
                    System Preferences
                </h3>

                <div className="flex items-center justify-between mt-5 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                    <FaBell className="text-cyan-600" /> Enable Notifications
                    </span>
                    <input type="checkbox" className="w-5 h-5 accent-cyan-600" />
                </div>

                <div className="flex items-center justify-between mt-4 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                    <FaMoon className="text-purple-600" /> Dark Mode
                    </span>
                    <input type="checkbox" className="w-5 h-5 accent-purple-600" />
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
};

export default Settings;
