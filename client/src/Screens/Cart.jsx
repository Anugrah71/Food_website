import React from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../context/ContextReducer";
import api from "../api/axios";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="w-full py-10 text-center text-2xl text-gray-200">
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
      await api.post("/api/orderData", {
        order_data: data,
        order_date: new Date().toDateString(),
      });

      dispatch({ type: "DROP" });
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-x-auto rounded-lg bg-white p-6 shadow-md">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-b text-xl text-purple-600">
              <th className="px-2 py-3">#</th>
              <th className="px-2 py-3">Name</th>
              <th className="px-2 py-3">Quantity</th>
              <th className="px-2 py-3">Option</th>
              <th className="px-2 py-3">Amount</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr
                key={index}
                className="border-b text-gray-700 transition hover:bg-gray-50"
              >
                <td className="px-2 py-3 font-semibold">{index + 1}</td>
                <td className="px-2 py-3">{food.name}</td>
                <td className="px-2 py-3">{food.qty}</td>
                <td className="px-2 py-3">{food.size}</td>
                <td className="px-2 py-3">{food.price}</td>
                <td className="px-2 py-3">
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
            className="rounded-md bg-gradient-to-r from-purple-700 to-purple-500 px-6 py-3 font-medium text-white shadow-md transition hover:shadow-lg"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
