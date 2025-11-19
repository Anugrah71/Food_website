import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import { useCart } from "../context/ContextReducer";
import Cart from "../Screens/Cart";
import "../styles/Navbar.css";
export default function Navebar() {
  let data = useCart();
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="enhanced-navbar">
      <div className="navbar-inner container-fluid">
        <div className="logo">Soulful Meals</div>
        <div className="d-flex space-between">
          <div className="nav-links me-4">
            <Link to="/" className="nav-item">
              Home
            </Link>
            {localStorage.getItem("authToken") && (
              <Link to="/myOrders" className="nav-item">
                My Orders
              </Link>
            )}
          </div>
          <div className="nav-actions ">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link to="/login" className="nav-btn">
                  Login
                </Link>
                <Link to="/createuser" className="nav-btn">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div className="nav-item" onClick={() => setCart(true)}>
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cart && (
                  <Modal onClose={() => setCart(false)}>
                    <Cart />
                  </Modal>
                )}
                <div className="nav-item" onClick={Logout}>
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
