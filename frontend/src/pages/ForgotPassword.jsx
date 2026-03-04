import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "animate.css"; 
import "../index.css";

const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, newPassword }),
            });
            const data = await res.json();
            if (!res.ok) return alert(data.message);
            alert("Password updated successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Backend not responding");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 via-cyan-100 to-blue-200 relative overflow-hidden">
            {/* Background Accent - Pulse Animation */}
            <div className="animate__animated animate__pulse animate__infinite animate__slower absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-70"></div>

            <form
                onSubmit={handleSubmit}
                className="animate__animated animate__zoomIn animate__faster relative bg-white shadow-2xl rounded-[2.5rem] p-10 w-full max-w-md border border-slate-100"
            >
                <div className="mb-8">
                    {/* Back Link - Fade In */}
                    <Link to="/" className="animate__animated animate__fadeInLeft inline-flex items-center text-xs font-black text-blue-600 hover:text-blue-700 transition-colors group mb-6 uppercase tracking-widest">
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                    <h2 className="animate__animated animate__fadeInDown text-4xl font-black text-slate-900 tracking-tighter">Reset Access</h2>
                    <p className="animate__animated animate__fadeInDown text-slate-500 text-xs mt-2 font-bold uppercase tracking-wide">Identity Verification Required</p>
                </div>

                <div className="space-y-6">
                    {/* Username Field - Slide Left */}
                    <div className="animate__animated animate__fadeInLeft animate__delay-1s">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                        <div className="relative group">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none font-bold transition-all"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field - Slide Left with Delay */}
                    <div className="animate__animated animate__fadeInLeft animate__delay-1s">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Recovery Email</label>
                        <div className="relative group">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none font-bold transition-all"
                                placeholder="admin@smartpark.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field - Slide Left with Delay */}
                    <div className="animate__animated animate__fadeInLeft animate__delay-2s">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">New Secure Password</label>
                        <div className="relative group">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none font-bold transition-all"
                                placeholder="••••••••"
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

                {/* Submit Button - Fade Up */}
                <button
                    type="submit"
                    className="animate__animated animate__fadeInUp animate__delay-2s w-full mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 hover:brightness-110 transition-all active:scale-[0.98] tracking-widest text-sm"
                >
                    UPDATE CREDENTIALS
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;