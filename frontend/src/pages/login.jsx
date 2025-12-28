import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Backend not responding");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <form
        onSubmit={handleSubmit}
        name="login-form"
        id="login-form"
        className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Operator Login
        </h2>

        <div className="mb-6">
          <i className="fas fa-envelope absolute mt-1.5 text-gray-400"></i>
          <label htmlFor="email" className="block mb-2 ml-6 font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-2 relative">
          <i className="fas fa-lock absolute mt-1.5 text-gray-400"></i>
          <label htmlFor="password" className="block mb-2 ml-6 font-medium text-gray-700">Password</label>
          <input
            id="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter Password"
            required
          />
          <span
            className="absolute right-3 top-14 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-8 forgot-password flex justify-end">
          <a href="forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
