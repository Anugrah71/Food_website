import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URLL;

      const response = await fetch(`${backendURL}/api/MyOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
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
console.log("hh>>>>>>>>>>",orderData);
return (
  <div>
    <Navbar />

    <div
      className="container d-flex flex-column"
      style={{ minHeight: "calc(100vh - 100px)" }} 
    >
      <div className="row flex-grow-1">
        {orderData.orderData && orderData.orderData.order_data ? (
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((itemGroup, index) => (
              <div key={index} className="mb-4">
                {/* Display the Order Date */}
                {itemGroup[0]?.Order_date && (
                  <div className="m-auto mt-5 text-center">
                    <h5>{itemGroup[0].Order_date}</h5>
                    <hr />
                  </div>
                )}

                <div className="row">
                  {itemGroup.map((item, idx) => (
                    !item.Order_date && ( 
                      <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div
                          className="card mt-3"
                          style={{
                            width: "100%",
                            maxHeight: "360px",
                          }}
                        >
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt="..."
                            style={{
                              height: "120px",
                              objectFit: "fill",
                            }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: "38px" }}
                            >
                              <span className="m-1">{item.qty}</span>
                              <span className="m-1">{item.size}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{item.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center mt-5">
            <h3>You have not ordered yet.</h3>
          </div>
        )}
      </div>
    </div>

    <Footer />
  </div>
);
}



