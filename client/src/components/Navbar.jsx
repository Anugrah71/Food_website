import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useCart } from "../context/ContextReducer";
import Cart from "../pages/Cart";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Navbar() {
  const { accessToken, clearDetails } = useAuth();
  const data = useCart();
  const [cart, setCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    try {
      api.delete("/api/refresh", { withCredentials: true });
      clearDetails();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      clearDetails();
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#5e3f9c] to-[#9370db] py-4 text-white shadow-lg font-sans transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
            Soulful <span className="font-light text-purple-100">Meals</span>
          </span>
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-sm">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full"
            />
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-base font-semibold hover:text-purple-200 transition-colors"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="text-base font-semibold hover:text-purple-200 transition-colors"
          >
            About Us
          </Link>
          {accessToken && (
            <Link
              to="/myOrders"
              className="text-base font-semibold hover:text-purple-200 transition-colors"
            >
              My Orders
            </Link>
          )}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="hidden rounded-md bg-white px-6 py-3 text-sm font-bold tracking-wider text-[#5e3f9c] hover:bg-purple-50 md:block uppercase shadow-md active:scale-95 transition-all">
            Order Now
          </Link>

          <div
            className="relative cursor-pointer group"
            onClick={() => setCart(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white group-hover:text-purple-200 transition-colors"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {data.length > 0 && (
              <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white ring-2 ring-[#7b57c4]">
                {data.length}
              </span>
            )}
          </div>

          {!accessToken ? (
            <Link
              to="/login"
              className="text-base font-bold text-white hover:text-purple-200 border-b-2 border-transparent hover:border-white transition-all"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 border border-white/30 cursor-pointer hover:bg-white/30 transition-all shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-4 w-56 bg-white shadow-xl rounded-xl py-3 z-50 text-gray-800 animate-in fade-in zoom-in duration-150 ring-1 ring-black ring-opacity-5"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      Account Settings
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-base hover:bg-purple-50 hover:text-[#5e3f9c] font-medium transition-colors"
                  >
                    Edit Profile
                  </Link>

                  <Link
                    to="/change-password"
                    className="flex items-center px-4 py-3 text-base hover:bg-purple-50 hover:text-[#5e3f9c] font-medium transition-colors"
                  >
                    Change Password
                  </Link>

                  <hr className="my-2 border-gray-100" />

                  <button
                    onClick={Logout}
                    className="w-full text-left px-4 py-3 text-base font-bold text-red-500 hover:bg-red-50 transition-colors uppercase"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="text-white md:hidden ml-4"
            onClick={() => setOpen(!open)}
          >
            <span className="text-3xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-0 top-full w-full bg-[#7b57c4] border-t border-white/10 px-6 py-8 shadow-2xl md:hidden z-40">
          <div className="flex flex-col gap-6">
            <Link
              className="text-xl font-semibold tracking-wide"
              to="/"
              onClick={() => setOpen(false)}
            >
              Menu
            </Link>
            <Link
              className="text-xl font-semibold tracking-wide"
              to="/about"
              onClick={() => setOpen(false)}
            >
              About Us
            </Link>
            {accessToken && (
              <Link
                className="text-xl font-semibold tracking-wide"
                to="/myOrders"
                onClick={() => setOpen(false)}
              >
                My Orders
              </Link>
            )}
            {!accessToken ? (
              <Link
                to="/login"
                className="w-full text-center py-4 bg-white/20 rounded-xl font-bold text-lg text-white tracking-wide"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={Logout}
                className="w-full text-center py-4 bg-red-600/20 text-red-100 rounded-xl font-bold text-lg tracking-wide"
              >
                Logout
              </button>
            )}
            <button className="w-full rounded-xl bg-white py-4 font-black uppercase text-[#5e3f9c] text-base tracking-[0.2em] shadow-lg">
              ORDER NOW
            </button>
          </div>
        </div>
      )}

      {cart && (
        <Modal onClose={() => setCart(false)}>
          <Cart />
        </Modal>
      )}
    </header>
  );
}