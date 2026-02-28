import Navbar from "../components/Navbar";
import { FaDownload, FaFilter, FaChartPie, FaCarSide, FaCheckCircle, FaClock, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Reports = () => {
  // Static data for UI representation
  const reports = [
    { id: 1, plate: "GJ-05-HK-2211", entry: "10:15 AM", exit: "1:10 PM", duration: "2h 55m", status: "Completed" },
    { id: 2, plate: "MH-12-AB-5555", entry: "10:40 AM", exit: "-", duration: "In Parking", status: "Active" },
    { id: 3, plate: "DL-02-KL-9090", entry: "11:00 AM", exit: "01:30 PM", duration: "2h 30m", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 animate-in fade-in duration-700">

        {/* Header with improved typography and breadcrumb feel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Analytics</h1>
            <p className="text-slate-500 font-medium mt-1">
              Real-time insights and historical performance tracking
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-slate-700 shadow-sm hover:bg-white transition-all">
              <FaFilter className="text-cyan-600" /> Advanced Filters
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-200/50 transition-all active:scale-95">
              <FaDownload /> Export Dataset
            </button>
          </div>
        </div>

        {/* Stats Cards with comparative trends */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <FaCarSide className="text-blue-600 text-2xl" />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <FaArrowUp /> 12%
              </span>
            </div>
            <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">Total Daily Volume</h3>
            <p className="text-4xl font-black mt-1 text-slate-900">128</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-cyan-50 rounded-2xl">
                <FaChartPie className="text-cyan-600 text-2xl" />
              </div>
              <span className="flex items-center gap-1 text-rose-500 text-xs font-bold bg-rose-50 px-2 py-1 rounded-lg">
                <FaArrowDown /> 4%
              </span>
            </div>
            <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">Current Occupancy</h3>
            <p className="text-4xl font-black mt-1 text-slate-900">46</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <FaCheckCircle className="text-emerald-600 text-2xl" />
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Target: 100</span>
            </div>
            <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">Check-outs Today</h3>
            <p className="text-4xl font-black mt-1 text-slate-900">82</p>
          </div>
        </div>

        {/* Reports Table with glassmorphism header */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-left text-slate-500 text-xs font-bold uppercase tracking-widest border-b">License Plate</th>
                  <th className="px-6 py-5 text-left text-slate-500 text-xs font-bold uppercase tracking-widest border-b">Check-In</th>
                  <th className="px-6 py-5 text-left text-slate-500 text-xs font-bold uppercase tracking-widest border-b">Check-Out</th>
                  <th className="px-6 py-5 text-left text-slate-500 text-xs font-bold uppercase tracking-widest border-b">Stay Duration</th>
                  <th className="px-8 py-5 text-left text-slate-500 text-xs font-bold uppercase tracking-widest border-b">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reports.map(r => (
                  <tr key={r.id} className="group hover:bg-cyan-50/30 transition-all">
                    <td className="px-8 py-5 font-bold text-slate-900 text-lg group-hover:text-cyan-700 transition-colors">
                      {r.plate}
                    </td>
                    <td className="px-6 py-5 text-slate-600 font-medium">{r.entry}</td>
                    <td className="px-6 py-5 text-slate-600 font-medium">{r.exit}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-700 font-bold">
                        <FaClock className="text-slate-300 group-hover:text-cyan-500 transition-colors" />
                        {r.duration}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {r.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-1.5 text-xs font-bold rounded-full border border-emerald-100 shadow-sm">
                          <FaCheckCircle className="text-[10px]" /> Finished
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-4 py-1.5 text-xs font-bold rounded-full border border-blue-100 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                          In Progress
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-center">
            <button className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-extrabold text-cyan-600 hover:text-cyan-700 hover:border-cyan-300 hover:shadow-md transition-all">
              Generate Detailed PDF Report
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Reports;