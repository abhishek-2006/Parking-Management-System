import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message);

        alert("Password reset successful!");
        navigate("/");
        } catch (err) {
        console.error(err);
        alert("Backend not responding");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md transform transition duration-500 hover:scale-105"
        >
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
                Reset Password
            </h2>

            <div className="mb-6">
                <i className="fas fa-envelope absolute mt-1.5 text-gray-400"></i>
                <label className="block mb-2 ml-6 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />
            </div>

            <div className="mb-6">
                <i className="fas fa-lock absolute mt-1.5 text-gray-400"></i>   
                <label className="block mb-2 ml-6 font-medium text-gray-700">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
            Reset Password
            </button>
        </form>
        </div>
    );
};

export default ForgotPassword;
