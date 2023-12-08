// mongoose/dotenv/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("mongo connect", err);
  });
const app = express();
app.listen(3500, () => {
  console.log("Server is running on port 3500!!!");
});
