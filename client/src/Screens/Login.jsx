import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendURL}/api/loginusers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      Navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-[0_3px_10px_rgba(122,102,171,0.15)] p-8 border border-[#e8e1f6]">
        <h3 className="text-center text-3xl font-bold text-[#4a2c82] mb-6">
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="exampleInputEmail1"
              className="block text-gray-700 font-medium mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e3f9c] focus:border-transparent bg-[#f7f2ff]"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="exampleInputPassword1"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5e3f9c] focus:border-transparent bg-[#f7f2ff]"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 mb-3"
          >
            Submit
          </button>

          <Link
            to="/createuser"
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200 no-underline"
          >
            Create a new account
          </Link>
        </form>
      </div>
    </div>
  );
}
