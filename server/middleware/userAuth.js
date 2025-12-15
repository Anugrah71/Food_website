const jwt = require("jsonwebtoken");
const User = require("../models/user");

const accessTokenSecret = process.env.ACCESS_TOKEN_PRIVATE_KEY;

const userAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      error: "Access Denied. Token not provided or invalid format.",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decode = jwt.verify(token, accessTokenSecret);
    const userId = decode._id;
    const user = await User.findById(userId).select("role");
    if (!user) {
        return res.status(401).send({ error: "User not found." });
    }
    console.log("role", user);
    if (!user.role.includes("user")) {
      return res
        .status(403)
        .send({ error: "Forbidden. User privileges required." });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Verification Error.:", err.message);
    res
      .status(401)
      .send({ error: "Invalid or expired token. Pleas log in again." });
  }
};
module.exports = userAuth;
