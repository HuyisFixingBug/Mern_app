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
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Finternet--web%2Fprejudice%2Fuser-128.html&psig=AOvVaw1qPDmMH-V7Ez3eKr1VtlhC&ust=1702143241555000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjC0vKvgIMDFQAAAAAdAAAAABAD",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
