const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://goFood:1234@cluster0.9ararlj.mongodb.net/goFoodMern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const fetch_data = await mongoose.connection.db.collection("food_items");
    const foodItems = await fetch_data.find({}).toArray(); 
    const foodCategory = await mongoose.connection.db.collection("food_category");
    const category = await foodCategory.find({}).toArray();
    global.food_items = foodItems;
    global.food_Category = category;

  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;
