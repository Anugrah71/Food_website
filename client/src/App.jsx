import React from "react";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import MyOrders from "./Screens/MyOrders";
import { CartProvider } from "./context/ContextReducer";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./admin/pages/AdminLogin";


function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-[#f9f7f3] font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/myOrders" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
