const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const userAuth = require("../middleware/userAuth");
const ordersController = require("../controller/orders.controller");

//  PLACE ORDER
router.post("/orderData", userAuth, ordersController.createOrder);

router.post("/MyOrderData", userAuth, ordersController.fetchOrderedItems);

module.exports = router;
