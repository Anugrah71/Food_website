import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const {setDetails} = useAuth();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendURL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.error) {
      alert("Enter valid credentials");
    }
    else{
      setDetails(json.accessToken,credentials.email)
      // localStorage.setItem("accessToken", json.accessToken);
      // localStorage.setItem("userEmail", credentials.email);
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
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="exampleInputEmail1"
              className="mb-2 block font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5e3f9c] focus:outline-none"
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
              className="mb-2 block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 bg-[#f7f2ff] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5e3f9c] focus:outline-none"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="mb-3 w-full rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-green-600"
          >
            Submit
          </button>

          <Link
            to="/createuser"
            className="block w-full rounded bg-red-500 px-4 py-2 text-center font-bold text-white no-underline transition duration-200 hover:bg-red-600"
          >
            Create a new account
          </Link>
        </form>
      </div>
    </div>
  );
}
