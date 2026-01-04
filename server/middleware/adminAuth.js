const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtSecret = process.env.JWT_SECRET;

const adminAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({
      error: "Access Denied. Token not provided or invalid format.",
    });
  }
  const token = authHeader.replace("Bearer ", "");
  
    // console.log("token decode" , jwt.verify(token, jwtSecret))

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.user.id;

    const user = await User.findById(userId).select("role");
    // console.log("role", user)
    if (user.role !== "admin") {
      return res
        .status(403)
        .send({ error: "Forbidden. Admin privileges required." });
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
module.exports = adminAuth;
