import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "https://st.quantrimang.com/photos/image/072015/22/avatar.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
