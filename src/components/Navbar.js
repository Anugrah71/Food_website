import React, {useState  }from "react";
import { Link ,useNavigate} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import { useCart } from '../components/ContextReducer';
import Cart from "../Screens/Cart";



export default function Navebar() {
  let data = useCart();
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar_">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
          Soulful Meals
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken")) ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          {(!localStorage.getItem("authToken")) ?
          <div className="d-flex">
            <Link className="btn bg-white text-success mx-1" to="/login">
              login
            </Link>

            <Link className="btn bg-white text-success mx-1" to="/createuser">
              Signup
            </Link>
            </div>
            : <div>
            <div className="btn bg-white text-success mx-2" onClick={()=>setCart(true)}>
             My Cart {" "}
              <Badge pill bg="danger">{data.length}</Badge>
        </div>
        {cart? <Modal onClose={()=>setCart(false)}><Cart></Cart></Modal> : ""}
            <div className="btn bg-white text-success mx-2" onClick={Logout}>
            Logout
        </div>
        </div>
}</div>
      </nav>
    </div>
  );
}