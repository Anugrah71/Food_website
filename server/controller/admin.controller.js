const streamifier = require("streamifier");
const FoodItem = require("../models/foodItem.model");
const cloudinary = require("../config/cloudinary.config");

exports.addNewFood = async (req, res) => {
  try {
    if (!req.file) {
      return req
        .status(400)
        .json({ success: false, message: "No Image Uploaded" });
    }
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "food_items",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    const imageUrl = result.secure_url;

    let optionsData;
    try {
      optionsData = JSON.parse(req.body.options);
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid options format" });
    }

    await FoodItem.create({
      name: req.body.name,
      CategoryName: req.body.CategoryName,
      img: imageUrl,
      options: optionsData,
      description: req.body.description,
    });
    res.json({
      success: true,
      message: "Food item added successfully!",
      imageUrl,
    });
  } catch (error) {
    console.error("Admin Add Item Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
