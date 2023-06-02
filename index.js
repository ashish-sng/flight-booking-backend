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

// Start the server
const PORT = process.env.port || 4000;
app.listen(PORT, () => {
  mongoose
    .connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB Atlas");
      console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err.message);
    });
});
