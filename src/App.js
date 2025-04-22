import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import MyOrders from "./Screens/MyOrders";
import { CartProvider } from "./components/ContextReducer";

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exath path="/" element={<Home />} />
          <Route exath path="/login" element={<Login />} />
          <Route exath path="/createuser" element={<Signup />} />
          <Route exath path="/myOrders" element={<MyOrders />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
