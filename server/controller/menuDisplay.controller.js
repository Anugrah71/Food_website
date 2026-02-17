const mongoose = require("mongoose");

exports.fetchFoodData = async (req, res) => {
  try {
    const foodItems = await mongoose.connection.db
      .collection("newFoodData")
      .find({})
      .toArray();

    const category = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    res.send([foodItems, category]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

