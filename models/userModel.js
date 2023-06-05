const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create a User model based on the schema
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
