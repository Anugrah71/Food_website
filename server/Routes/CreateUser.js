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

      await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true, message: "User created successfully" });
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

   
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" });
      res.status(200).json({ success: true, authToken });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
