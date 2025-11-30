import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendURL}/api/MyOrderData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      });
      const json = await response.json();
      setOrderData(json);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto my-8 flex-grow px-4">
        {orderData.orderData && orderData.orderData.order_data ? (
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((itemGroup, index) => (
              <div key={index} className="mb-8">
                {/* Display the Order Date */}
                {itemGroup[0]?.Order_date && (
                  <div className="mb-6 text-center">
                    <h5 className="inline-block border-b-2 border-[#5e3f9c] pb-1 text-xl font-bold text-gray-700">
                      {itemGroup[0].Order_date}
                    </h5>
                  </div>
                )}

                {/* Grid for Items */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {itemGroup.map(
                    (item, idx) =>
                      !item.Order_date && (
                        <div key={idx} className="flex justify-center">
                          <div className="w-full overflow-hidden rounded-lg border border-[#e8e1f6] bg-white shadow-md transition-transform hover:-translate-y-1">
                            <img
                              src={item.img}
                              className="h-[120px] w-full object-cover"
                              alt={item.name}
                            />
                            <div className="p-4">
                              <h5 className="mb-2 truncate text-lg font-bold text-[#4a2c82]">
                                {item.name}
                              </h5>
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span className="rounded bg-[#f7f2ff] px-2 py-1 text-[#5e3f9c]">
                                  Qty: {item.qty}
                                </span>
                                <span className="rounded bg-[#f7f2ff] px-2 py-1 text-[#5e3f9c] uppercase">
                                  {item.size}
                                </span>
                                <div className="text-lg font-semibold text-gray-800">
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="mt-20 text-center text-2xl text-gray-500">
            <h3>You have not ordered yet.</h3>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
