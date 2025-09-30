const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Retry fetch function
    const fetchData = async () => {
      try {
        const foodItemsCol = await mongoose.connection.db.collection("newFoodData");
        const foodItems = await foodItemsCol.find({}).toArray();

        const foodCategoryCol = await mongoose.connection.db.collection("foodCategory");
        const category = await foodCategoryCol.find({}).toArray();

        global.food_items = foodItems;
        global.food_Category = category;

        console.log("Data fetched successfully");
      } catch (err) {
        console.error("Fetching failed, retrying in 5s...", err);
        setTimeout(fetchData, 5000); // retry after 5 seconds
      }
    };

    fetchData();

  } catch (err) {
    console.error("Error connecting to MongoDB, retrying in 5s...", err);
    setTimeout(mongoDB, 5000);
  }
};

module.exports = mongoDB;
