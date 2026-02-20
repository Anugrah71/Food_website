import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { BackIcon } from "../components/ui/PasswordCard"; // Import if you want a back button

export default function Signup() {
  const { setDetails } = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    geolocation: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/signup", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
        location: credentials.geolocation,
      });

      setDetails(res.data.accessToken, credentials.email);
      navigate("/");
   } catch (err) {
  console.error("Signup failed:", err.message);
  if (err.response) {
    console.error("Server response:", err.response.data);
  }
  alert("Something went wrong. Please try again later.");
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f3f0f8] via-[#ede8f7] to-[#f9f6ff] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e8daf5] bg-white p-8 shadow-xl shadow-purple-100">
        <h3 className="mb-6 text-center text-3xl font-black text-[#3d1a6e]">
          Create Account
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold text-[#5a2d8a]">Name</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border-2 border-[#d9c5f0] bg-white px-4 py-3 text-sm text-[#3d1a6e] placeholder-[#c4a8e0] outline-none transition-all duration-200 focus:border-[#7b2fbe]"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold text-[#5a2d8a]">Email address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-[#d9c5f0] bg-white px-4 py-3 text-sm text-[#3d1a6e] placeholder-[#c4a8e0] outline-none transition-all duration-200 focus:border-[#7b2fbe]"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold text-[#5a2d8a]">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Create a strong password"
              className="w-full rounded-xl border-2 border-[#d9c5f0] bg-white px-4 py-3 text-sm text-[#3d1a6e] placeholder-[#c4a8e0] outline-none transition-all duration-200 focus:border-[#7b2fbe]"
            />
          </div>

          {/* Address Field */}
          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-semibold text-[#5a2d8a]">Address</label>
            <input
              type="text"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              placeholder="Enter your address"
              className="w-full rounded-xl border-2 border-[#d9c5f0] bg-white px-4 py-3 text-sm text-[#3d1a6e] placeholder-[#c4a8e0] outline-none transition-all duration-200 focus:border-[#7b2fbe]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mb-4 w-full rounded-xl bg-gradient-to-r from-[#7b2fbe] to-[#9b59b6] py-3.5 font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-[#8e6db0]">Already have an account? </span>
            <Link
              to="/login"
              className="font-bold text-[#7b2fbe] transition-colors hover:text-[#5a1fa0]"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
