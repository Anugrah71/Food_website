const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/signup", authController.registerNewUser);

router.post("/login", authController.login);

router.get("/sendRestPassLink", authController.sendRestPassLink);
router.patch("/password-reset/:userId/:token", authController.passwordRest);

module.exports = router;
