import { useEffect, useState } from "react";
import { FaCar, FaParking, FaCheckCircle, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
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
    if (!window.confirm("Confirm check-out for this vehicle?")) return;
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

  const occupancyPercent = stats.totalCapacity
    ? Math.round((stats.occupied / stats.totalCapacity) * 100)
    : 0;

  const statCards = [
    { label: "Total Capacity", value: stats.totalCapacity, icon: <FaParking />, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600", border: "border-indigo-200 dark:border-indigo-800" },
    { label: "Available", value: stats.available, icon: <FaCheckCircle />, color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600", border: "border-emerald-200 dark:border-emerald-800" },
    { label: "Occupied", value: stats.occupied, icon: <FaCar />, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600", border: "border-orange-200 dark:border-orange-800" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Live Overview</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Monitoring SmartParking Lot</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95"
            >
              <FaPlus /> Check-in Vehicle
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, i) => (
            <div key={i} className={`bg-white dark:bg-slate-900 border ${card.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`${card.color} p-3 rounded-xl text-2xl`}>{card.icon}</div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
              </div>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{card.value}</p>
            </div>
          ))}

          {/* Occupancy Progress Card */}
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Occupancy</span>
              <span className="text-blue-600 font-bold">{occupancyPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  occupancyPercent > 80 ? "bg-red-500" : occupancyPercent > 50 ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: `${occupancyPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 font-medium italic underline decoration-blue-200">
              Live parking capacity meter
            </p>
          </div>
        </div>

        {/* Current Vehicles Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Current Assignments</h3>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Plate number..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">License Plate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slot ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Parked Duration</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {vehicles.filter(v => v.status === "Parked").map((v) => (
                  <tr key={v._id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{v.plate}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm font-mono border border-gray-200 dark:border-slate-700">
                        {v.slot}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                      {v.checkInTime ? new Date(v.checkInTime).toLocaleTimeString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full">
                        {v.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {v.parkedDuration}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        v.status === "Parked" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
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
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <form 
              onSubmit={handleCheckIn}
              className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img src="../src/assets/favicon.png" alt="Logo" className="w-8 h-8" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">New Entry</h3>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-1">License Plate</label>
                  <input
                    required
                    type="text"
                    value={formData.plate}
                    onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    placeholder="e.g. GJ-05-HK-2211"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-1">Slot Number</label>
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
                {loading ? "Processing..." : "Confirm Check-in"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;