const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/signup", authController.registerNewUser);

router.post("/login", authController.login);

router.post("/sendRestPassLink", authController.sendRestPassLink);
router.patch("/password-reset/:userId/:token", authController.passwordRest);
router.patch("/change-current-pass", authController.changeCurrentpassword);

module.exports = router;
