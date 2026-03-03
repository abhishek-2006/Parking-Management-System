import { useEffect, useState } from "react";
import { 
    FaSearch, FaEdit, FaCheck, FaTimes, 
    FaTrashAlt, FaCar, FaClock
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All Types");
    
    // Edit States
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ plate: "", slot: "" });

    const fetchVehicles = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/vehicles");
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            setVehicles(data);
        } catch (err) { 
            console.error(err); 
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const startEditing = (v) => {
        setEditingId(v._id);
        setEditData({ plate: v.plate, slot: v.slot });
    };

    const handleSaveEdit = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });
            if (res.ok) {
                setEditingId(null);
                fetchVehicles();
            }
        } catch (err) { 
            console.error(err);
            alert("Failed to update record"); 
        }
    };

    const handleRemove = async (id) => {
        if (!window.confirm("Are you sure you want to remove this record?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/checkout/${id}`, { method: "PUT" });
            if (res.ok) fetchVehicles();
        } catch (err) {
            console.error(err);
            alert("Failed to remove record");
        }
    };

    const getTypeStyles = (type) => {
        switch (type) {
            case 'SUV': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';
            case 'Motorcycle': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
            case 'Truck': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300';
            case 'Van': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
            case 'Sedan': return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        }
    };

    const filteredVehicles = vehicles.filter(v => 
        v.plate.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "All Types" || v.type === filterType)
    );

    return (
        <div className="colorful-bg min-h-screen transition-colors duration-500 pb-12">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 pt-8 animate-in fade-in duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div className="flex items-center gap-5">
                        <img src="/src/assets/favicon.png" alt="Logo" className="w-16 h-16 drop-shadow-2xl" />
                        <div>
                            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Vehicle Management
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-xs">
                                Historical & Active Sessions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="glass-card rounded-[2rem] p-6 mb-10 flex flex-col md:flex-row gap-4">
                    <div className="relative grow">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by license plate..."
                            className="w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl outline-none font-bold dark:text-white transition-all focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="px-6 py-4 bg-white/50 dark:bg-slate-800/50 border-none rounded-2xl outline-none font-bold dark:text-white cursor-pointer transition-all focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All Types">All Categories</option>
                        {["Motorcycle", "Van", "Hatchback", "Sedan", "Coupe", "SUV", "Convertible", "Truck"].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                {/* Data Table */}
                <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl border-none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/30 dark:bg-slate-800/30 text-slate-400 text-xs font-black uppercase tracking-widest">
                                    <th className="px-8 py-6">License Plate</th>
                                    <th className="px-6 py-6">Slot ID</th>
                                    <th className="px-6 py-6">Category</th>
                                    <th className="px-6 py-6">Status</th>
                                    <th className="px-6 py-6 text-center">Duration</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10 dark:divide-slate-800">
                                {filteredVehicles.map((v) => (
                                    <tr key={v._id} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors group">
                                        <td className="px-8 py-6">
                                            {editingId === v._id ? (
                                                <input 
                                                    className="w-full bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-xl px-3 py-2 outline-none font-black dark:text-white"
                                                    value={editData.plate}
                                                    onChange={(e) => setEditData({...editData, plate: e.target.value.toUpperCase()})}
                                                />
                                            ) : (
                                                <span className="font-black text-indigo-600 dark:text-cyan-400 text-lg">{v.plate}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            {editingId === v._id ? (
                                                <input 
                                                    className="w-24 bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-xl px-3 py-2 outline-none font-mono font-black dark:text-white"
                                                    value={editData.slot}
                                                    onChange={(e) => setEditData({...editData, slot: e.target.value.toUpperCase()})}
                                                />
                                            ) : (
                                                <span className="bg-white/50 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-mono font-black border border-white/20 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                                    {v.slot}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getTypeStyles(v.type)}`}>
                                                {v.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                                v.status === "Parked" 
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" 
                                                : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${v.status === "Parked" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-center font-bold text-slate-500 dark:text-slate-400 text-sm">
                                        {v.parkedDuration && v.parkedDuration !== "N/A" ? (
                                            <div className="flex items-center justify-center gap-2">
                                            <FaClock className="text-indigo-400 dark:text-cyan-500/50" />
                                            <span>{v.parkedDuration}</span>
                                            </div>
                                        ) : (
                                            <span className="opacity-30">--</span>
                                        )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                {editingId === v._id ? (
                                                    <>
                                                        <button 
                                                            onClick={() => handleSaveEdit(v._id)} 
                                                            className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                        <button 
                                                            onClick={() => setEditingId(null)} 
                                                            className="p-3 bg-slate-400 text-white rounded-xl hover:bg-slate-500 transition-all"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button 
                                                            onClick={() => startEditing(v)} 
                                                            className="p-3 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                                            title="Edit Details"
                                                        >
                                                            <FaEdit size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleRemove(v._id)} 
                                                            className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                                            title="Remove Record"
                                                        >
                                                            <FaTrashAlt size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredVehicles.length === 0 && (
                        <div className="py-20 text-center">
                            <FaCar className="text-6xl text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No vehicles found</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Vehicles;