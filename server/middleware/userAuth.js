const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_PRIVATE_KEY;

const userAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    console.log(" Missing Authorization header:", req.originalUrl);
    return res.status(401).json({
      error: "Access Denied. No token provided.",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = decoded;
    const roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];
    console.log("ROle", roles);

    if (!roles.includes("user")) {
      return res.status(403).json({
        error: "Forbidden. User privileges required.",
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
};

module.exports = userAuth;
