const Orders = require("../models/order.model");

//  PLACE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { order_data, order_date } = req.body;
    const email = req.user.email;
    // console.log("email ", email)

    if (!order_data || !order_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let data = [...order_data];
    data.unshift({ Order_date: order_date });

    const existingOrder = await Orders.findOne({ email });

    if (!existingOrder) {
      await Orders.create({
        email,
        order_data: [data],
      });
    } else {
      await Orders.findOneAndUpdate({ email }, { $push: { order_data: data } });
    }

    res.status(200).json({ message: "Order Placed" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.fetchOrderedItems = async (req, res) => {
  try {
    const email = req.user.email;
    console.log("email id >>>>>>>>>>>> ", email)

    const myData = await Orders.findOne({ email });
    // console.log("MyData>>>", myData);
    res.json({ orderData: myData });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
