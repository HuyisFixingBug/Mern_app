// mongoose/dotenv/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
// import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("mongo connect", error);
  });
const app = express();
// import body-parser
import bodyParser from "body-parser";

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// use jsonParser or urlencodedParser before your route handlers
app.use("/api/auth", jsonParser, authRouter);
app.listen(3500, () => {
  console.log("Server is running on port 3500!!!");
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
