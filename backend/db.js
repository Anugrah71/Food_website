const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://Test_db:3878@cluster1.hjxodni.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster1";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
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
