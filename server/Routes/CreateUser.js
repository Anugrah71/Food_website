const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Username should be minimum 3 characters").isLength({
      min: 3,
    }),
    body("password", "Password should be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const newUser = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        location: req.body.location,
        role: req.body.role || "user",
      });
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" });
      res.json({
        success: true,
        message: "User created successfully",
        authToken,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

router.post(
  "/loginusers",
  [
    body("email", "enter correct email").isEmail(),
    body("password", "password shoud be minmum 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log("Type email:>", email);
    try {
      const userData = await User.findOne({ email });
      console.log("UserData", userData);
      if (!userData) {
        console.log("Inside the");
        return res
          .status(400)
          .json({ success: false, error: "User not found" });
      }
      console.log("pass", password);
      console.log("storedpass", userData.password);
      const passwordCompare = await bcrypt.compare(password, userData.password);
      console.log("pass", passwordCompare);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "5s" });
      res.status(200).json({ success: true, authToken });
    } catch (error) {
      console.error("Server error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
