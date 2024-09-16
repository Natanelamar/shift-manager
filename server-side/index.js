const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routers/userRoute");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connect to DB.
const dbURI = process.env.STR_CONNECT;

if (!dbURI) {
  console.error("Database URI is not defined");
  process.exit(1);
}

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/", userRoute);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
