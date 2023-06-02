const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define the flight schema
const flightSchema = new mongoose.Schema({
  source: String,
  destination: String,
  fare: String,
  departureDate: String,
  duration: String,
  flightName: String,
});

// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});


// Create a Flight model based on the schema
const Flight = mongoose.model("Flight", flightSchema, "flightData");

// Create a User model based on the schema
const User = mongoose.model("User", userSchema, "users");

// API endpoint for flight search
app.get("/flights", async (req, res) => {
  try {
    const { source, destination } = req.query;

    // Perform the search based on source and destination
    const flights = await Flight.find({
      source: { $regex: new RegExp(source, "i") },
      destination: { $regex: new RegExp(destination, "i") },
    });

    if (flights.length === 0) {
      return res.status(404).json({ message: "No flights found." });
    }

    // Display flight prices
    const flightPrices = flights.map((flight) => {
      return {
        source: flight.source,
        destination: flight.destination,
        fare: flight.fare,
        flightName: flight.flightName,
        departureDate: flight.departureDate,
        duration: flight.duration,
      };
    });

    res.json(flightPrices);
  } catch (error) {
    console.error("Error searching flights:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Register route
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Start the server
const PORT = process.env.port || 4000;
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
      console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err.message);
    });
});
