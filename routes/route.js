const express = require("express");
const getFlights = require("../controllers/flight");
const { register, login } = require("../controllers/auth");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.route("/flights").get(verifyToken,getFlights);

router.route("/register").post(register);

router.route("/login").post(login);

module.exports = router;