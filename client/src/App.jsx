import React from "react";
// import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import { CartProvider } from "./context/ContextReducer";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import Menu from "./pages/Menu";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChangePassword from "./pages/password/ChangePassword";
import ForgotPassword from "./pages/password/ForgotPassword";
import PasswordSuccess from "./pages/password/PasswordSuccess";
import RestPassword from "./pages/password/RestPassword";
import LinkSendSuccess from "./pages/password/LinkSendSuccess";


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
            <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-success" element={<PasswordSuccess />} />
              <Route path="/link-send-success" element={<LinkSendSuccess />} />
              <Route path="/reset-password/:userId/:token" element={<RestPassword />} />
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
