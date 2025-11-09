const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// All Routes
const booking = require("./routes/booking");
const cabin = require("./routes/cabin");
const guest = require("./routes/guest");
const setting = require("./routes/setting");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"], // allow only my front-end
    credentials: true, // allow cookies or tokens if needed
  })
);
app.use(express.json());

connectDB();

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

module.exports = app

WARN! Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings