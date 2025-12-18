const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/*
  MongoDB connection
  ONLINE hosting (Render) ke liye
  URI Render ke Environment Variable se aayega
*/
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/*
  User schema
  MongoDB collection ka structure
*/
const UserSchema = new mongoose.Schema({
  name: String,
  userId: String,
});

const User = mongoose.model("User", UserSchema);

/*
  API: Add user
*/
app.post("/add", async (req, res) => {
  const { name, userId } = req.body;
  const user = new User({ name, userId });
  await user.save();
  res.json({ message: "Data Saved" });
});

/*
  API: Get all users
*/
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/*
  Server start
  Render apna PORT deta hai
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
