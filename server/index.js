const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoDB = require("./db");

const port = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://food-website-1-ck7j.onrender.com",
// "http://192.168.1.3:5173",
];

(async () => {
  await mongoDB();

  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/admin", require("./Routes/AdminData"));
  app.use("/api", require("./Routes/authRoutes"));
  app.use("/api/refresh", require("./Routes/refreshToken"));
  app.use("/api", require("./Routes/DisplayData"));
  app.use("/api", require("./Routes/OrderData"));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
