const express = require("express");
const router = express.Router();
require("dotenv").config();
const refreshTokenControlle = require("../controller/refreshToken.controller");

router.post("/", refreshTokenControlle.refreshAccessToken);

router.delete("/", refreshTokenControlle.logoutUser);

module.exports = router;
