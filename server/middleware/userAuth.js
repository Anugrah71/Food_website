const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtSecret = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      error: "Access Denied. Token not provided or invalid format.",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decode = jwt.verify(token, jwtSecret);
    const userId = decode.user.id;
    const user = await User.findById(userId).select("role");
    console.log("role", user);
    if (user.role !== "user") {
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
