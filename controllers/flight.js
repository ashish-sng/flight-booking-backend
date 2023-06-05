const Flight = require("../models/flightModel");

const getFlights = async (req, res) => {
  try {
    const { source, destination, departureDate } = req.query;

    // Perform the search based on source and destination and departure date
    const flights = await Flight.find({
      source: { $regex: new RegExp(source.trim(), "i") },
      destination: { $regex: new RegExp(destination.trim(), "i") },
      departureDate: departureDate,
    });

    if (flights.length === 0) {
      return res.status(404).json({ message: "No flights found." });
    }

    // Display flight details
    const flightDetails = flights.map((flight) => {
      return {
        source: flight.source,
        destination: flight.destination,
        fare: flight.fare,
        flightName: flight.flightName,
        departureDate: flight.departureDate,
        duration: flight.duration,
      };
    });

    res.json(flightDetails);
  } catch (error) {
    console.error("Error searching flights:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = getFlights;
