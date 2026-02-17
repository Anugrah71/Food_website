const express = require("express");
const router = express.Router();
const menuDisplayConrtoller = require("../controller/menuDisplay.controller");

router.post("/foodData", menuDisplayConrtoller.fetchFoodData);

module.exports = router;
