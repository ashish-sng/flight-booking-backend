const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

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

// Create a Flight model based on the schema
const Flight = mongoose.model("Flight", flightSchema, "flightData");

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
