const mongoose = require("mongoose");

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

module.exports = Flight;