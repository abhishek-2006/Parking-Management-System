import { useState } from "react";
import Navbar from "../components/Navbar";
import { toggleTheme, getInitialTheme } from "../utils/theme";
import { 
    FaUserCog, FaShieldAlt, FaSave, 
    FaLock, FaMoon, FaSun, FaGlobe, FaPalette 
} from "react-icons/fa";
import "animate.css"; //

const Settings = () => {
    const [activeTab, setActiveTab] = useState("Account");
    const [isDark, setIsDark] = useState(getInitialTheme());

    const handleThemeChange = () => {
        const newStatus = !isDark;
        setIsDark(newStatus);
        toggleTheme(newStatus);
    };

    const tabs = [
        { name: "Account", icon: <FaUserCog /> },
        { name: "Security", icon: <FaLock /> },
        { name: "Preferences", icon: <FaPalette /> }
    ];

    return (
        <div className="colorful-bg min-h-screen transition-colors duration-500 pb-24">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-8 overflow-hidden">
                
                {/* Header Section - Fades Down */}
                <div className="animate__animated animate__fadeInDown flex items-center gap-5 mb-10">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-indigo-100 dark:border-slate-700">
                        <img src="/src/assets/favicon.png" alt="Logo" className="animate__animated animate__pulse animate__infinite animate__slow w-12 h-12" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tighter">
                            System Settings
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-[10px]">
                            Manage Your Parkman Environment
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Sidebar - Slides In Left */}
                    <div className="animate__animated animate__fadeInLeft space-y-4">
                        <div className="glass-card rounded-[2.5rem] p-6 shadow-xl border-none">
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-2">Configuration</h2>
                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                                            activeTab === tab.name
                                                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                                                : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800"
                                        }`}
                                    >
                                        <span className="text-lg">{tab.icon}</span>
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Security Tip - Subtle Pulse */}
                        <div className="animate__animated animate__fadeInLeft animate__delay-1s glass-card rounded-[2.5rem] p-6 bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-xl">
                            <FaShieldAlt className="animate__animated animate__flash animate__infinite animate__slower text-3xl mb-4 opacity-50" />
                            <h4 className="font-black text-lg mb-2 tracking-tight">Security Tip</h4>
                            <p className="text-[10px] font-bold text-indigo-100 leading-relaxed uppercase tracking-wide">
                                Enable two-factor authentication to keep your parking data extra secure.
                            </p>
                        </div>
                    </div>

                    {/* Right Content Area - Dynamic Zoom */}
                    <div className="lg:col-span-3">
                        {activeTab === "Account" && (
                            <div className="animate__animated animate__zoomIn animate__faster glass-card rounded-[3rem] p-10 shadow-2xl border-none">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl">
                                        <FaUserCog className="text-2xl text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Account Profile</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Administrator Name</label>
                                        <input className="w-full p-5 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl outline-none font-black dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all" defaultValue="Abhishek Shah" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input className="w-full p-5 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl outline-none font-black dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all" defaultValue="admin@parkman.com" />
                                    </div>
                                </div>

                                <button className="mt-10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center gap-3 uppercase tracking-widest text-xs">
                                    <FaSave /> Save Profile
                                </button>
                            </div>
                        )}

                        {activeTab === "Security" && (
                            <div className="animate__animated animate__zoomIn animate__faster glass-card rounded-[3rem] p-10 shadow-2xl border-none">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-2xl">
                                        <FaLock className="text-2xl text-rose-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Security Credentials</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full p-5 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl outline-none font-black dark:text-white focus:ring-4 focus:ring-rose-500/10 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                        <input type="password" placeholder="Min. 8 characters" className="w-full p-5 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl outline-none font-black dark:text-white focus:ring-4 focus:ring-rose-500/10 transition-all" />
                                    </div>
                                </div>

                                <button className="mt-10 bg-gradient-to-r from-rose-600 to-red-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-all active:scale-95 uppercase tracking-widest text-xs">
                                    Update Password
                                </button>
                            </div>
                        )}

                        {activeTab === "Preferences" && (
                            <div className="animate__animated animate__zoomIn animate__faster glass-card rounded-[3rem] p-10 shadow-2xl border-none">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-2xl">
                                        <FaPalette className="text-2xl text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Interface Settings</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-8 bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700 rounded-[2.5rem] hover:bg-white/50 transition-colors">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 bg-indigo-100 dark:bg-slate-700 rounded-2xl">
                                                {isDark ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-indigo-600 text-xl" />}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Dark Mode</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">High-contrast dark environment</p>
                                            </div>
                                        </div>
                                        <label htmlFor="darkModeToggle" className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" id="darkModeToggle" className="sr-only peer" checked={isDark} onChange={handleThemeChange} />
                                            <div className="w-16 h-9 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-8 bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700 rounded-[2.5rem] hover:bg-white/50 transition-colors">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 bg-cyan-100 dark:bg-slate-700 rounded-2xl">
                                                <FaGlobe className="text-cyan-600 text-xl" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Global Search</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Search active & historical records</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-16 h-9 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;