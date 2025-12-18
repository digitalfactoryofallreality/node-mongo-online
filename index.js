const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MONGODB CONNECT
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// SCHEMA
const UserSchema = new mongoose.Schema({
  name: String,
  userId: String
});

const User = mongoose.model("User", UserSchema);

// GET USERS
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST USER
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
