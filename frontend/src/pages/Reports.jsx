import { useEffect, useState } from "react";
import { 
    FaDownload, FaSearch, FaCarSide, FaClock, FaWallet, 
    FaChartLine, FaHistory, FaCheckCircle
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import "animate.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, revenue: 0, todayRevenue: 0 });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/vehicles");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setReports(data);
      setFilteredReports(data);
      
      const totalRev = data.reduce((acc, v) => acc + (v.revenue || 0), 0);
      const today = new Date().toLocaleDateString();
      const todayRev = data
        .filter(v => v.checkOutTime && new Date(v.checkOutTime).toLocaleDateString() === today)
        .reduce((acc, v) => acc + (v.revenue || 0), 0);

      setStats({
        total: data.length,
        active: data.filter(v => v.status === "Parked").length,
        completed: data.filter(v => v.status === "Exited").length,
        revenue: totalRev,
        todayRevenue: todayRev
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const filtered = reports.filter(r => {
      const matchesSearch = r.plate.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredReports(filtered);
  }, [searchTerm, statusFilter, reports]);

  const exportToCSV = () => {
    if (filteredReports.length === 0) return alert("No data to export");
    const headers = ["License Plate", "Slot", "Type", "Status", "Revenue", "Check-In", "Check-Out", "Duration"];
    const rows = filteredReports.map(r => [
      r.plate, r.slot, r.type, r.status, `₹${r.revenue || 0}`,
      new Date(r.checkInTime).toLocaleString(),
      r.checkOutTime ? new Date(r.checkOutTime).toLocaleString() : "N/A",
      r.parkedDuration || "N/A"
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Parkman_Revenue_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="colorful-bg min-h-screen transition-colors duration-500 pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-8 overflow-hidden">
        {/* Header Section - Fades Down */}
        <div className="animate__animated animate__fadeInDown flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="animate__animated animate__pulse animate__infinite animate__slow p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-indigo-100 dark:border-slate-700">
                <img src="/src/assets/favicon.png" alt="Logo" className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tighter">
                Financial Analytics
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                <FaChartLine className="text-indigo-500" /> Revenue & Occupancy Insights
              </p>
            </div>
          </div>

          <button onClick={exportToCSV} className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
            <FaDownload /> EXPORT FINANCIALS
          </button>
        </div>

        {/* Dynamic Stats Grid - Staggered Flip Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="animate__animated animate__flipInX glass-card rounded-[2rem] p-6 border-l-4 border-l-indigo-500">
            <div className="flex justify-between items-start mb-2">
                <FaWallet className="text-indigo-500 text-2xl" />
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Total Revenue</h3>
            <p className="text-3xl font-black dark:text-white tracking-tighter">₹{stats.revenue}</p>
          </div>

          <div className="animate__animated animate__flipInX animate__delay-1s glass-card rounded-[2rem] p-6 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-2">
                <FaHistory className="text-emerald-500 text-2xl" />
                <span className="animate__animated animate__flash animate__infinite animate__slow text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">LIVE</span>
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Today's Earnings</h3>
            <p className="text-3xl font-black dark:text-white tracking-tighter">₹{stats.todayRevenue}</p>
          </div>

          <div className="animate__animated animate__flipInX animate__delay-2s glass-card rounded-[2rem] p-6 border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start mb-2">
                <FaCarSide className="text-blue-500 text-2xl" />
                <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-lg uppercase">Current</span>
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Active Sessions</h3>
            <p className="text-3xl font-black dark:text-white tracking-tighter">{stats.active}</p>
          </div>

          <div className="animate__animated animate__flipInX animate__delay-3s glass-card rounded-[2rem] p-6 border-l-4 border-l-rose-500">
            <div className="flex justify-between items-start mb-2">
                <FaCheckCircle className="text-rose-500 text-2xl" />
            </div>
            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Completed</h3>
            <p className="text-3xl font-black dark:text-white tracking-tighter">{stats.completed}</p>
          </div>
        </div>

        {/* Search & Filter Bar - Slides In Left */}
        <div className="animate__animated animate__fadeInLeft animate__delay-3s glass-card rounded-[2rem] p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Filter by plate number..."
              className="w-full pl-14 pr-6 py-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl outline-none font-bold dark:text-white border-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-8 py-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl outline-none font-bold dark:text-white cursor-pointer border-none focus:ring-2 focus:ring-indigo-500"
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Parked">Active Sessions</option>
            <option value="Exited">Settled Payments</option>
          </select>
        </div>

        {/* Data Table - Slides Up from Bottom */}
        <div className="animate__animated animate__fadeInUp animate__delay-4s glass-card rounded-[3rem] overflow-hidden border-none shadow-2xl mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-white/30 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">License Plate</th>
                  <th className="px-6 py-6">Timeline</th>
                  <th className="px-6 py-6">Duration</th>
                  <th className="px-8 py-6">Revenue</th>
                  <th className="px-8 py-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 dark:divide-slate-800">
                {filteredReports.map(r => (
                  <tr key={r._id} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors group">
                    <td className="px-8 py-6">
                        <span className="font-black text-indigo-600 dark:text-cyan-400 text-lg block tracking-tight">{r.plate}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{r.type}</span>
                    </td>
                    <td className="px-6 py-6">
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            {new Date(r.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                            <span className="mx-2 text-slate-300">→</span>
                            {r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "..."}
                        </div>
                    </td>
                    <td className="px-6 py-6 font-black text-slate-700 dark:text-slate-200 text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <FaClock className={r.status === 'Parked' ? 'text-emerald-500 animate-pulse' : 'text-slate-300'} />
                        {r.parkedDuration || "Running"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-lg font-black tracking-tighter ${r.revenue > 0 ? "text-emerald-600" : "text-slate-300"}`}>
                        ₹{r.revenue || 0}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 text-[9px] font-black uppercase rounded-full tracking-tighter ${r.status === 'Exited' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {r.status === 'Exited' ? 'Settled' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;