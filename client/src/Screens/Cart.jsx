import React from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../context/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-200 text-2xl">
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch(`${backendURL}/api/orderData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="w-full px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="text-purple-600 text-xl border-b">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Quantity</th>
              <th className="py-3 px-2">Option</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 text-gray-700 transition"
              >
                <td className="py-3 px-2 font-semibold">{index + 1}</td>
                <td className="py-3 px-2">{food.name}</td>
                <td className="py-3 px-2">{food.qty}</td>
                <td className="py-3 px-2">{food.size}</td>
                <td className="py-3 px-2">{food.price}</td>
                <td className="py-3 px-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Total Price: {totalPrice}/-
          </h1>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCheckOut}
            className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-6 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
