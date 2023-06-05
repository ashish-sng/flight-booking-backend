const jwt = require("jsonwebtoken");

// verify logged in or not!
const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Unauthorized request");
    }
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader == "undefined") {
      throw new Error("Unauthorized request");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    const jwtVerification = jwt.verify(req.token, process.env.JWT_SECRET);
    if (!jwtVerification) {
      throw new Error("Invalid token");
    }

    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
