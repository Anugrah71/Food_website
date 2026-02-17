import UserTokenModel from "../models/userToken.model.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  return new Promise(async (resolve, reject) => {
    let doc;
    try {
      doc = await UserTokenModel.findOne({ token: refreshToken });
    } catch (dbErr) {
      return reject({
        error: true,
        message: "Database error during token retrieval.",
      });
    }

    if (!doc)
      return reject({
        error: true,
        message: "Invalid refresh token (Not found in DB)",
      });

    jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      if (err)
        return reject({
          error: true,
          message: "Invalid refresh token (Signature/Expiry fail)",
        });

      resolve({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};
export default verifyRefreshToken;
