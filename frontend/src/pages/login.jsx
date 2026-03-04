import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaParking } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "animate.css"; // Import the library
import "../index.css";
import { isAuthenticated } from "../utils/auth"; //

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]); //

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
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Backend not responding");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 via-cyan-100 to-blue-200 relative overflow-hidden">
      
      {/* Animated background orbs using animate.css infinite pulses */}
      <div className="animate__animated animate__pulse animate__infinite animate__slow absolute top-[-10%] right-[-10%] w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
      <div className="animate__animated animate__pulse animate__infinite animate__slower absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      {/* Main Form Entry: Zoom In and Fade Down */}
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__zoomIn animate__faster relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="flex flex-col items-center mb-8">
          {/* Logo with a bounce effect */}
          <div className="animate__animated animate__bounceInDownmb-4">
            <img src="../src/assets/favicon.png" alt="Logo" className="w-24 h-24 drop-shadow-2xl animate__animated animate__pulse animate__infinite animate__slow" />
          </div>
          <h2 className="animate__animated animate__fadeInDown animate__delay-1s text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="animate__animated animate__fadeInDown animate__delay-1s text-slate-500 text-sm mt-1 font-medium">Please enter your credentials</p>
        </div>

        <div className="space-y-5">
          {/* Staggered text input entrances using delay classes */}
          <div className="animate__animated animate__fadeInLeft animate__delay-1s">
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-bold"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="animate__animated animate__fadeInLeft animate__delay-1s">
            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-bold"
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

        <div className="animate__animated animate__fadeInUp animate__delay-1s flex items-center justify-between mt-6 mb-8">
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
          className="animate__animated animate__fadeInUp animate__delay-1s w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;