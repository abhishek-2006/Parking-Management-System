import { FaSearch, FaFilter, FaPlus, FaCar, FaCheck, FaTimes, FaEllipsisV, FaFileExport } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Vehicles = () => {
    // Static data for UI representation
    const vehicles = [
        { id: 1, plate: "GJ-05-HK-2211", slot: "A-12", type: "SUV", time: "10:15 AM", status: "Parked" },
        { id: 2, plate: "MH-12-AB-5555", slot: "B-07", type: "Sedan", time: "10:40 AM", status: "Parked" },
        { id: 3, plate: "DL-02-KL-9090", slot: "C-01", type: "Hatchback", time: "11:00 AM", status: "Exited" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50/50">
            <Navbar />

            <main className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Vehicle Management</h1>
                        <p className="text-slate-500 font-medium mt-1">Real-time monitoring of all parking activities</p>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition shadow-sm">
                            <FaFileExport className="text-cyan-600" /> Export
                        </button>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-cyan-200/50 active:scale-95">
                            <FaPlus /> Add Vehicle
                        </button>
                    </div>
                </div>

                {/* Search & Global Filters - Glassmorphism style */}
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl shadow-slate-200/50 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow group">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by license plate number..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-sm transition-all"
                        />
                    </div>

                    <div className="flex gap-3">
                        <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 outline-none focus:border-cyan-500 transition-all cursor-pointer">
                            <option>All Types</option>
                            <option>SUV</option>
                            <option>Sedan</option>
                            <option>Hatchback</option>
                        </select>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition shadow-sm">
                            <FaFilter className="text-cyan-600" /> Filter
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/80">
                                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Plate</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Assigned Slot</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Vehicle Category</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Current Status</th>
                                    <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Check-In Time</th>
                                    <th className="px-8 py-5 text-right text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Options</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {vehicles.map((v) => (
                                    <tr key={v.id} className="group hover:bg-cyan-50/40 transition-all">
                                        <td className="px-8 py-5 font-bold text-slate-900 text-lg tracking-tight group-hover:text-cyan-700 transition-colors">
                                            {v.plate}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-xs font-mono font-bold group-hover:bg-white group-hover:border-cyan-200 transition-all">
                                                {v.slot}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                                <FaCar className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                                                {v.type}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            {v.status === "Parked" ? (
                                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold text-xs border border-emerald-100 shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                                    Parked
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full font-bold text-xs border border-rose-100 shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                                                    Exited
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-5 text-slate-500 font-medium text-sm italic">
                                            {v.time}
                                        </td>

                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-400 hover:text-cyan-600 transition-colors">
                                                    <FaEllipsisV />
                                                </button>
                                                <button className="text-rose-500 hover:text-rose-700 font-extrabold text-sm transition-colors px-3 py-1 rounded-lg hover:bg-rose-50">
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-center">
                        <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-cyan-600 hover:text-cyan-700 hover:border-cyan-200 hover:shadow-sm transition-all shadow-sm">
                            View Performance Analytics
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Vehicles;