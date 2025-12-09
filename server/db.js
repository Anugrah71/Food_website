const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully");
  } catch (err) {
    console.error("Connection failed", err);
  }
};

module.exports = mongoDB;
