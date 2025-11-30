import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendURL}/api/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      Navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f7f3] p-4">
      <div className="w-full max-w-md rounded-lg border border-[#e8e1f6] bg-white p-8 shadow-[0_3px_10px_rgba(122,102,171,0.15)]">
        <h3 className="mb-6 text-center text-3xl font-bold text-[#4a2c82]">
          Sign Up
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5e3f9c] focus:outline-none"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5e3f9c] focus:outline-none"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5e3f9c] focus:outline-none"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="geolocation"
              className="mb-2 block font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5e3f9c] focus:outline-none"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            className="mb-3 w-full rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-green-600"
          >
            Submit
          </button>
          <Link
            to="/login"
            className="block w-full rounded bg-red-500 px-4 py-2 text-center font-bold text-white no-underline transition duration-200 hover:bg-red-600"
          >
            Already have an account? Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
