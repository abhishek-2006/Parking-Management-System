import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaParking } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Backend not responding");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 via-cyan-100 to-blue-200 relative overflow-hidden">
      
      {/* Decorative soft glowing orbs for depth */}
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <FaParking className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Please enter your credentials</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 mb-8">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
          </label>
          <Link to="/forgot-password" size="sm" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;