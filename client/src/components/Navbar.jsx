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
    <div className="w-full bg-gradient-to-r from-[#5e3f9c] to-[#9370db] text-white py-3">
      <div className="flex items-center justify-between w-full px-6">

        <div className="text-[26px] font-semibold tracking-wide">
          Soulful Meals
        </div>

        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
           {open ? "✕" : "☰"}

        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">

          <div className="flex items-center gap-6">
            <Link to="/" className="text-[16px] hover:text-purple-200">
              Home
            </Link>

            {localStorage.getItem("authToken") && (
              <Link to="/myOrders" className="text-[16px] hover:text-purple-200">
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
                  className="bg-white text-[#5e3f9c] px-4 py-2 rounded-md text-[14px] font-medium hover:bg-purple-100"
                >
                  Login
                </Link>
                <Link
                  to="/createuser"
                  className="bg-white text-[#5e3f9c] px-4 py-2 rounded-md text-[14px] font-medium hover:bg-purple-100"
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
                    <span className="absolute -top-2 -right-5 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
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
        <div className="md:hidden flex flex-col gap-6 bg-[#6B4ABF] py-4 px-6">

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
                className="bg-white text-[#5e3f9c] px-4 py-2 rounded-md text-[16px] font-medium hover:bg-purple-100"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/createuser"
                className="bg-white text-[#5e3f9c] px-4 py-2 rounded-md text-[16px] font-medium hover:bg-purple-100"
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
                  <span className="absolute -top-2  bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
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
