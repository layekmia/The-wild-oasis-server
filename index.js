const express = require("express");
const cors = require("cors");
require("dotenv").config();

// All Routes
const booking = require("./routes/booking");
const cabin = require("./routes/cabin");
const guest = require("./routes/guest");
const setting = require("./routes/setting");
const connectDB = require("./config/db");

const app = express();

app.use(
  cors()
);
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

const routes = [
  { path: "/api/bookings", router: booking },
  { path: "/api/cabins", router: cabin },
  { path: "/api/guests", router: guest },
  { path: "/api/settings", router: setting },
];

routes.forEach(({ path, router }) => app.use(path, router));

app.get("/", (req, res) => {
  res.send("The Wild Oasis Website Backend is working");
});

app.listen(PORT, () => {
  console.log("server running on port ..");
});

module.exports = app;
