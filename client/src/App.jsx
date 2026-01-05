import React from "react";
// import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import MyOrders from "./Screens/MyOrders";
import { CartProvider } from "./context/ContextReducer";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./admin/pages/AdminLogin";
import Menu from "./Screens/Menu";
import AboutUs from "./Screens/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-[#f9f7f3] font-sans">
          <Navbar/>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/myOrders" element={<MyOrders />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
