import React from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../context/ContextReducer";
import "../styles/Cart.css";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  if (data.length === 0) {
    return (
      <div style={{ color: "white" }}>
        <div className="fs-3 m-5 w-100 text-center">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("User Email:>>>>>>>>>>>>>>>>>>>>>>>>>", userEmail);
    let response = await fetch(`${backendURL}/api/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Response:", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    } else {
      console.error("Checkout failed with status:", response.status);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container-div table-responsive table-responsive-sm table-responsive-md container m-auto mt-5">
        <table className="table-hover table">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete
                      onClick={() => dispatch({ type: "REMOVE", index })}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn btn-checkout mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
