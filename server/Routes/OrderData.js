const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const userAuth = require("../middleware/userAuth")


router.post("/orderData",userAuth, async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    if (!email || !order_data || !order_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let data = [...order_data];
    data.unshift({ Order_date: order_date });

    let eId = await Orders.findOne({ email });
    

    if (eId === null) {
      await Orders.create({
        email,
        order_data: [data],
      });

      res.status(200).json({ message: "Order Placed" });
    } else {
      await Orders.findOneAndUpdate(
        { email },
        { $push: { order_data: data } }
      );

      res.status(200).json({ message: "Order Placed" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});
router.post("/MyOrderData",userAuth, async (req, res) => {
  try {
    let myData = await Orders.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
});

module.exports = router;
