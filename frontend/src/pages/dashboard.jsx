import React, { useEffect, useState  } from "react";
import { FaCar, FaParking, FaCheckCircle, FaPlus, FaSearch, FaTimes, FaMoneyBillWave } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "animate.css"; 

const Dashboard = () => {
  const [stats, setStats] = useState({ totalCapacity: 0, available: 0, occupied: 0 });
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ plate: "", slot: "", type: "SUV" });

  const fetchData = async () => {
    try {
      const statsRes = await fetch("http://localhost:5000/api/dashboard/stats");
      const statsData = await statsRes.json();
      setStats({
        totalCapacity: statsData.totalCapacity,
        available: statsData.availableSpaces,
        occupied: statsData.occupiedSpaces,
      });

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
      const res = await fetch("http://localhost:5000/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Vehicle checked in successfully!");
      setIsModalOpen(false);
      setFormData({ plate: "", slot: "", type: "SUV" }); 
      fetchData(); 
    } catch (err) {
      console.error("Check-in error:", err);
      alert("Server error during check-in");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (id) => {
    const vehicle = vehicles.find(v => v._id === id);
    if (!vehicle) return alert("Vehicle not found");
    
    const confirmMessage = `Confirm Checkout for ${vehicle.plate}?\nSlot: ${vehicle.slot}\nDuration: ${vehicle.parkedDuration}`;
    if (!window.confirm(confirmMessage)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/checkout/${id}`, { method: "PUT" });
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
    { label: "Total Capacity", value: stats.totalCapacity, icon: <FaParking />, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600", border: "border-indigo-200 dark:border-indigo-800", delay: "" },
    { label: "Available", value: stats.available, icon: <FaCheckCircle />, color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600", border: "border-emerald-200 dark:border-emerald-800", delay: "animate__delay-1s" },
    { label: "Occupied", value: stats.occupied, icon: <FaCar />, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600", border: "border-orange-200 dark:border-orange-800", delay: "animate__delay-2s" },
  ];

  return (
    <div className="colorful-bg min-h-screen transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 overflow-hidden">
        {/* Header Section - Fades Down */}
        <div className="animate__animated animate__fadeInDown flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-5">
            <img src="../src/assets/favicon.png" alt="Logo" className="w-10 h-10 drop-shadow-2xl animate__animated animate__pulse animate__infinite animate__slow" />
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tighter">
                Live Status
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase text-xs">Lot Monitoring Active</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2 hover:brightness-110"
          >
            <FaPlus /> CHECK-IN
          </button>
        </div>

        {/* Stats Grid - Staggered Slide In */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, i) => (
            <div 
              key={i} 
              className={`animate__animated animate__fadeInRight ${card.delay} glass-card rounded-[2.5rem] p-8 border-l-8 ${card.border} ${card.color} shadow-lg hover:scale-[1.02] transition-transform`}
            >
              <div className="flex justify-between items-center mb-4">
                {card.icon && React.cloneElement(card.icon, { className: "text-3xl" })}
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</span>
              </div>
              <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{card.value}</p>
            </div>
          ))}

          {/* Earnings Card - Final Staggered Item */}
          <div className="animate__animated animate__fadeInRight animate__delay-3s glass-card rounded-[2.5rem] p-8 border-l-8 border-l-amber-500 shadow-amber-100 dark:shadow-none bg-amber-50 dark:bg-amber-900/10">
            <div className="flex justify-between items-center mb-6">
              <FaMoneyBillWave className="text-4xl text-amber-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Earnings</span>
            </div>
            <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
              ₹{vehicles.reduce((acc, v) => acc + (v.revenue || 0), 0)}
            </p>
          </div>
        </div>

        {/* Table Section - Slides Up from Bottom */}
        <div className="animate__animated animate__fadeInUp animate__delay-4s glass-card rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">Active Assignments</h3>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" id="search-input" placeholder="Search plate..." className="pl-12 pr-6 py-3 glass-card border-none rounded-2xl outline-none text-sm w-64 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-6">Plate</th>
                  <th className="px-6 py-6">Slot</th>
                  <th className="px-6 py-6">Type</th>
                  <th className="px-6 py-6">Duration</th>
                  <th className="px-6 py-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-slate-800">
                {vehicles.filter(v => v.status === "Parked").map((v) => (
                  <tr key={v._id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="px-8 py-6 font-black text-slate-900 dark:text-white">{v.plate}</td>
                    <td className="px-8 py-6">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                        {v.slot}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[10px] font-black px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full uppercase">
                        {v.type}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-500 dark:text-slate-400 font-bold">
                      {v.parkedDuration}
                    </td>
                    <td className="px-8 py-6">
                      <button onClick={() => handleCheckOut(v._id)} className="text-xs font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest transition-colors">
                        Checkout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Check-in Modal - Zoom Entrance */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate__animated animate__fadeIn" onClick={() => setIsModalOpen(false)}></div> 
            <form onSubmit={handleCheckIn} className="relative animate__animated animate__zoomIn animate__faster glass-card rounded-[3rem] p-10 w-full max-w-md border border-white/20">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
                    <FaParking className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">New Entry</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">License Plate</label>
                  <input required type="text" value={formData.plate} onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none font-bold" placeholder="GJ-05-..." />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Slot ID</label>
                  <input required type="text" value={formData.slot} onChange={(e) => setFormData({...formData, slot: e.target.value.toUpperCase()})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none font-bold" placeholder="A-101" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Vehicle Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold appearance-none">
                    {["Motorcycle", "Van", "Hatchback", "Sedan", "SUV", "Truck"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all">
                {loading ? "Processing..." : "CONFIRM ASSIGNMENT"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;