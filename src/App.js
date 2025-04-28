import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import MyOrders from "./Screens/MyOrders";
import { CartProvider } from "./context/ContextReducer";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path="/login" element={<Login />} />
            <Route  path="/createuser" element={<Signup />} />
            <Route  path="/myOrders" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
