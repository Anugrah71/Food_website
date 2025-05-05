const mongoose = require("mongoose");
require("dotenv").config();


const mongoURI = process.env.MONGODB_URI;
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const fetch_data = await mongoose.connection.db.collection("newFoodData");
    const foodItems = await fetch_data.find({}).toArray(); 
    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const category = await foodCategory.find({}).toArray();

    global.food_items = foodItems;
    global.food_Category = category;

  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;
