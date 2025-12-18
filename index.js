const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   ROOT ROUTE (FIXED)
===================== */
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* =====================
   MONGODB CONNECTION
===================== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

/* =====================
   USER SCHEMA & MODEL
===================== */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

/* =====================
   ROUTES
===================== */

// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST new user
app.post("/users", async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: "Name and UserId required" });
    }

    const user = new User({ name, userId });
    const savedUser = await user.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

/* =====================
   START SERVER
===================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
