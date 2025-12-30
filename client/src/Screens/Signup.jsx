import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Signup() {
  const { setDetails } = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
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
      console.error("Signup failed:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f7f3] p-4">
      <div className="w-full max-w-md rounded-lg border border-[#e8e1f6] bg-white p-8 shadow-[0_3px_10px_rgba(122,102,171,0.15)]">
        <h3 className="mb-6 text-center text-3xl font-bold text-[#4a2c82]">
          Sign Up
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 outline-none focus:ring-2 focus:ring-[#5e3f9c]"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 outline-none focus:ring-2 focus:ring-[#5e3f9c]"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 outline-none focus:ring-2 focus:ring-[#5e3f9c]"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              placeholder="Enter your address"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 outline-none focus:ring-2 focus:ring-[#5e3f9c]"
            />
          </div>

          <button
            type="submit"
            className="mb-3 w-full rounded bg-green-500 px-4 py-2 font-bold text-white transition hover:bg-green-600"
          >
            Submit
          </button>

          <Link
            to="/login"
            className="block w-full rounded bg-red-500 px-4 py-2 text-center font-bold text-white transition hover:bg-red-600"
          >
            Already have an account? Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
