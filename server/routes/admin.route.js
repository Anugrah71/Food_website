const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminAuth = require("../middleware/adminAuth");
const adminController = require("../controller/admin.controller");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/addFoodItem",
  adminAuth,
  upload.single("foodImage"),
  adminController.addNewFood,
);
module.exports = router;
