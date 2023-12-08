// mongoose/dotenv/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
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
app.listen(3500, () => {
  console.log("Server is running on port 3500!!!");
});

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
