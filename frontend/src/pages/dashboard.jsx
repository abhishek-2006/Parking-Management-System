import React, { useEffect, useState  } from "react";
import { FaCar, FaParking, FaCheckCircle, FaPlus, FaSearch, FaTimes, FaMoneyBillWave } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCapacity: 0,
    available: 0,
    occupied: 0,
  });

  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    plate: "",
    slot: "",
    type: "SUV"
  });

  // Centralized fetch function to refresh UI after data changes
  const fetchData = async () => {
    try {
      // Fetch stats from dashboard controller
      const statsRes = await fetch("http://localhost:5000/api/dashboard/stats");
      const statsData = await statsRes.json();
      setStats({
        totalCapacity: statsData.totalCapacity,
        available: statsData.availableSpaces,
        occupied: statsData.occupiedSpaces,
      });

      // Fetch active vehicles from parking controller
      const vehiclesRes = await fetch("http://localhost:5000/api/vehicles");
      if (!vehiclesRes.ok) throw new Error("Failed to fetch vehicles");
      const vehiclesData = await vehiclesRes.json();
      setVehicles(vehiclesData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send data to the check-in backend endpoint
      const res = await fetch("http://localhost:5000/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Vehicle checked in successfully!");
      setIsModalOpen(false);
      setFormData({ plate: "", slot: "", type: "SUV" }); // Reset form
      fetchData(); // Refresh list and stats to show new entry
    } catch (err) {
      console.error("Check-in error:", err);
      alert("Server error during check-in");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (id) => {
    const vehicle = vehicles.find(v => v._id === id);
    if (!vehicle) {
      alert("Vehicle not found");
      return;
    }
    const confirmMessage = `
      Confirm Checkout for ${vehicle.plate}?
      -----------------------------
      Slot: ${vehicle.slot}
      Total Duration: ${vehicle.parkedDuration}
    `;
    
    if (!window.confirm(confirmMessage)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/checkout/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Vehicle checked out successfully!");
      fetchData();
    } catch (err) {
      console.error("Check-out error:", err);
      alert("Server error during check-out");
    }
  };

  const statCards = [
    { label: "Total Capacity", value: stats.totalCapacity, icon: <FaParking />, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600", border: "border-indigo-200 dark:border-indigo-800" },
    { label: "Available", value: stats.available, icon: <FaCheckCircle />, color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600", border: "border-emerald-200 dark:border-emerald-800" },
    { label: "Occupied", value: stats.occupied, icon: <FaCar />, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600", border: "border-orange-200 dark:border-orange-800" },
  ];

  return (
    <div className="colorful-bg min-h-screen transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-5">
            <img src="../src/assets/favicon.png" alt="Logo" className="w-10 h-10 drop-shadow-2xl" />
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Live Status
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase">Monitoring SmartParking Lot</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
            >
              <FaPlus /> CHECK-IN
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, i) => (
            <div key={i} className={`glass-card rounded-[2.5rem] p-8 border-l-8 ${card.border} transition-transform hover:scale-[1.02] ${card.color} shadow-lg`}>
              <div className="flex justify-between items-center mb-4">
              {card.icon && React.cloneElement(card.icon, { className: `text-3xl ${card.color.split(' ')[3]}` })}
              <span className="text-xs font-black text-slate-400 uppercase tracking-tight">{card.label}</span>
            </div>
              <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{card.value}</p>
            </div>
          ))}

          {/* Earnings Card */}
          <div className="glass-card rounded-[2.5rem] p-8 border-l-8 border-l-amber-500 shadow-amber-100 dark:shadow-none">
            <div className="flex justify-between items-center mb-6">
              <FaMoneyBillWave className="text-4xl text-amber-500" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Earnings</span>
            </div>
            <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              ₹{vehicles.reduce((acc, v) => acc + (v.revenue || 0), 0)}
            </p>
          </div>
        </div>

        {/* Current Vehicles Table */}
        <div className="glass-card rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Current Assignments</h3>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Plate number..."
                  className="pl-10 pr-6 py-3 glass-card border-none dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white w-64 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-slate-400 text-xs font-black uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">License Plate</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Slot ID</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Parked Duration</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-slate-800">
                {vehicles.filter(v => v.status === "Parked").map((v) => (
                  <tr key={v._id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                    <td className="px-8 py-4 text-center font-bold text-gray-900 dark:text-white">{v.plate}</td>
                    <td className="px-8 py-4 text-center">
                      <span className="bg-white/50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-mono border border-white/20 dark:border-slate-700">
                        {v.slot}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full">
                        {v.type}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {v.parkedDuration}
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                        v.status === "Parked" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => handleCheckOut(v._id)}
                        className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                      >
                        Check-out
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Check-in Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300" 
              onClick={() => setIsModalOpen(false)}
            ></div> 
            <form 
              onSubmit={handleCheckIn}
              className="relative glass-card rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md border border-white/20 dark:border-slate-700/50 animate-in zoom-in duration-300 shadow-[0_20px_50px_rgba(79,70,229,0.2)]"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                    <img src="../src/assets/favicon.png" alt="Logo" className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">New Entry</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vehicle Registration</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-tighter mb-2 ml-1">
                    License Plate
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.plate}
                    onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                    className="w-full p-4 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500 outline-none dark:text-white transition-all appearance-none cursor-pointer"
                    placeholder="e.g. GJ-05-HK-2211"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-gray-400 uppercase tracking-tighter mb-2 ml-1">
                    Slot Number
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.slot}
                    onChange={(e) => setFormData({...formData, slot: e.target.value.toUpperCase()})}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    placeholder="e.g. A-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Van">Van</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Coupe">Coupe</option>
                    <option value="SUV">SUV</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "CONFIRM ENTRY"
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;