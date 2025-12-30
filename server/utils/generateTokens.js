import jwt from "jsonwebtoken";
import UserTokenModel from "../models/UserToken.js";
import "dotenv/config";
const generateTokens = async (user) => {
  try {
    const userObject = user.toObject();
    const payload = {
      _id: userObject._id,
      role: userObject.role,
      email: userObject.email,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "15d" }
    );
    const UserTokenRecord = await UserTokenModel.findOne({
      userId: userObject._id,
    });
    if (UserTokenRecord)
      await UserTokenModel.deleteOne({ userId: userObject._id });

    await new UserTokenModel({
      userId: userObject._id,
      token: refreshToken,
    }).save();

    return { accessToken, refreshToken };
  } catch (err) {
    console.error("Token generation error:", err);
    throw err;
  }
};
export default generateTokens;
