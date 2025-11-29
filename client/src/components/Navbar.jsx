import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useCart } from "../context/ContextReducer";
import Cart from "../Screens/Cart";

export default function Navbar() {
  let data = useCart();
  const [cart, setCart] = useState(false);
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

        <div className="flex items-center gap-10">
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
                  <div> My Cart</div>
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
    </div>
  );
}
