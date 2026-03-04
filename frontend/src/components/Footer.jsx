import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import "animate.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-colors duration-500 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <img src="../src/assets/favicon.png" alt="Logo" className="w-24 h-24 drop-shadow-2xl animate__animated animate__pulse animate__infinite animate__slow" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">SmartPark</h3>
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering parking lot operators with real-time intelligence and automated financial tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigation</h4>
              <ul className="space-y-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <li>
                  <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer block">Dashboard</Link>
                </li>
                <li>
                  <Link to="/vehicles" className="hover:text-blue-600 transition-colors cursor-pointer block">Vehicles</Link>
                </li>
                <li>
                  <Link to="/reports" className="hover:text-blue-600 transition-colors cursor-pointer block">Reports</Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:text-blue-600 transition-colors cursor-pointer block">Settings</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Support</h4>
              <ul className="space-y-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Help Desk</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect With Us</h4>
            <div className="flex items-center gap-4 text-xl">
               <Link to="https://github.com/abhishek-2006" target="_blank" rel="noopener noreferrer">
                 <FaGithub className="text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
               </Link>
               <Link to="https://www.linkedin.com/in/abhishek-shah-051" target="_blank" rel="noopener noreferrer">
                 <FaLinkedin className="text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
               </Link>
               <Link to="mailto:shahabhishek051@gmail.com" target="_blank" rel="noopener noreferrer">
                 <FaEnvelope className="text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" />
               </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            © 2026 SmartPark Management. Developed by Abhishek Shah.
          </p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;