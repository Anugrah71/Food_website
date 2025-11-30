import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useCart } from "../context/ContextReducer";
import Cart from "../Screens/Cart";

export default function Navbar() {
  const data = useCart();
  const [cart, setCart] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#5e3f9c] to-[#9370db] py-3 text-white">
      <div className="flex w-full items-center justify-between px-6">
        <div className="text-[26px] font-semibold tracking-wide">
          Soulful Meals
        </div>

        <button
          className="text-3xl text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-10 md:flex">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[16px] hover:text-purple-200">
              Home
            </Link>

            {localStorage.getItem("authToken") && (
              <Link
                to="/myOrders"
                className="text-[16px] hover:text-purple-200"
              >
                My Orders
              </Link>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link
                  to="/login"
                  className="rounded-md bg-white px-4 py-2 text-[14px] font-medium text-[#5e3f9c] hover:bg-purple-100"
                >
                  Login
                </Link>
                <Link
                  to="/createuser"
                  className="rounded-md bg-white px-4 py-2 text-[14px] font-medium text-[#5e3f9c] hover:bg-purple-100"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div
                  className="relative cursor-pointer text-[16px] hover:text-purple-200"
                  onClick={() => setCart(true)}
                >
                  
                  <div>My Cart</div>

                  {data.length > 0 && (
                    <span className="absolute -top-2 -right-5 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                      {data.length}
                    </span>
                  )}
                </div>

                {cart && (
                  <Modal onClose={() => setCart(false)}>
                    <Cart />
                  </Modal>
                )}

                <div
                  className="cursor-pointer text-[16px] hover:text-purple-200"
                  onClick={Logout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="flex flex-col gap-6 bg-[#6B4ABF] px-6 py-4 md:hidden">
          <Link
            to="/"
            className="text-[18px] hover:text-purple-200"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {localStorage.getItem("authToken") && (
            <Link
              to="/myOrders"
              className="text-[18px] hover:text-purple-200"
              onClick={() => setOpen(false)}
            >
              My Orders
            </Link>
          )}

          {!localStorage.getItem("authToken") ? (
            <>
              <Link
                to="/login"
                className="rounded-md bg-white px-4 py-2 text-[16px] font-medium text-[#5e3f9c] hover:bg-purple-100"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/createuser"
                className="rounded-md bg-white px-4 py-2 text-[16px] font-medium text-[#5e3f9c] hover:bg-purple-100"
                onClick={() => setOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div
                className="relative cursor-pointer text-[18px]"
                onClick={() => {
                  setCart(true);
                  setOpen(false);
                }}
              >
                My Cart
                {data.length > 0 && (
                  <span className="absolute -top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                    {data.length}
                  </span>
                )}
              </div>

              <div
                className="cursor-pointer text-[18px]"
                onClick={() => {
                  setOpen(false);
                  Logout();
                }}
              >
                Logout
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
