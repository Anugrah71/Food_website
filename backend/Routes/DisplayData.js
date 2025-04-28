const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    if (!global.food_items || !global.food_Category) {
      return res.status(500).send("Food data is not available");
    }
    res.send([global.food_items, global.food_Category]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
