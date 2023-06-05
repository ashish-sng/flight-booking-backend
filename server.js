const app = require("./index");
const mongoose = require("mongoose");

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
