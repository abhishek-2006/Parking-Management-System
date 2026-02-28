import { useEffect, useState } from "react";
import { FaCar, FaParking, FaCheckCircle, FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCapacity: 0,
    available: 0,
    occupied: 0,
  });

  const [vehicles, setVehicles] = useState([]);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard");
        const data = await res.json();
        setStats({
          totalCapacity: data.totalCapacity,
          available: data.availableSpaces,
          occupied: data.occupiedSpaces,
        });
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch current vehicles
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/vehicles");
        if (!res.ok) throw new Error("Failed to fetch vehicles");
    
        const data = await res.json();
        setVehicles(data);
          } catch (err) {
            console.error(err);
          }
        };

    fetchDashboardData();
    fetchVehicles();
  }, []);

  const occupancyPercent = stats.totalCapacity
    ? Math.round((stats.occupied / stats.totalCapacity) * 100)
    : 0;

  const statCards = [
    { label: "Total Capacity", value: stats.totalCapacity, icon: <FaParking />, color: "bg-indigo-50 text-indigo-600", border: "border-indigo-200" },
    { label: "Available", value: stats.available, icon: <FaCheckCircle />, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
    { label: "Occupied", value: stats.occupied, icon: <FaCar />, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Live Overview</h2>
            <p className="text-gray-500 font-medium">Monitoring SmartParking Lot #42</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
              <FaPlus /> Check-in Vehicle
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, i) => (
            <div key={i} className={`bg-white border ${card.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`${card.color} p-3 rounded-xl text-2xl`}>{card.icon}</div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
              </div>
              <p className="text-4xl font-black text-gray-900">{card.value}</p>
            </div>
          ))}

          {/* Occupancy Progress Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-700">Occupancy</span>
              <span className="text-blue-600 font-bold">{occupancyPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  occupancyPercent > 80
                    ? "bg-red-500"
                    : occupancyPercent > 50
                    ? "bg-yellow-500"
                    : "bg-green-500"
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800">Current Assignments</h3>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Plate number..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                <FaFilter />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">License Plate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slot ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Arrival</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vehicles.map((v) => (
                  <tr key={v._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-900">{v.plate}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-mono border border-gray-200">{v.slot}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(v.checkInTime).toLocaleTimeString()}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">{v.type}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-500 font-medium">{v.status}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-500 hover:text-red-700 font-bold text-sm transition opacity-0 group-hover:opacity-100">
                        Release Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex justify-center">
            <button className="text-sm font-bold text-blue-600 hover:underline">View All Active Logs</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
