import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const { setDetails } = useAuth();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const data = res.data;
      if (data.error) {
        alert("Enter valid credentials");
      } else {
        setDetails(data.accessToken, credentials.email);
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f3f0f8] via-[#ede8f7] to-[#f9f6ff] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e8daf5] bg-white p-8 shadow-xl shadow-purple-100">
        <h3 className="mb-6 text-center text-3xl font-black text-[#3d1a6e]">
          Welcome Back
        </h3>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-[#5a2d8a]"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border-2 border-[#d9c5f0] bg-white px-4 py-3 text-sm text-[#3d1a6e] placeholder-[#c4a8e0] outline-none transition-all duration-200 focus:border-[#7b2fbe]"
            />
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[#5a2d8a]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border-2 border-[#d9c5f0] bg-white px-4 py-3 text-sm text-[#3d1a6e] placeholder-[#c4a8e0] outline-none transition-all duration-200 focus:border-[#7b2fbe]"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#7b2fbe] hover:text-[#5a1fa0] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mb-4 w-full rounded-xl bg-gradient-to-r from-[#7b2fbe] to-[#9b59b6] py-3.5 font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center text-sm">
            <span className="text-[#8e6db0]">Don't have an account? </span>
            <Link
              to="/createuser"
              className="font-bold text-[#7b2fbe] transition-colors hover:text-[#5a1fa0]"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}