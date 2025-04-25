const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    console.log("Request body>>>>>>>>>>>>>>>>>>>>:", req.body);
    let data = req.body.order_data;

    
   
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Orders.findOne({ email: req.body.email });
    console.log("Order data", eId);

    if (eId === null) {
      await Orders.create({
        email: req.body.email,
        order_data: [data],
      });

      res.status(200).json({ message: "Order Placed" });
    } else {
      await Orders.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );

      res.status(200).json({ message: "Order Placed" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server Error");
  }
});
router.post("/MyOrderData", async (req, res) => {
  try{
    let myData = await Orders.findOne({ email: req.body.email });
    res.json({orderData : myData});


  }catch(err){
res.send("Server Error",err.message);
  }
});

module.exports = router;
