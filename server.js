import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

// All Routes
// const booking = require("./routes/booking");
// const cabin = require("./routes/cabin");
import guest from "./routes/guest.js";
import setting from "./routes/setting.js"; 

const app = express();
 
app.use(
  cors({
    origin: ["http://localhost:3000"], // allow only my front-end
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // allow cookies or tokens if needed
  })
);
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

const routes = [
  // { path: "/api/bookings", router: booking },
  // { path: "/api/cabins", router: cabin },
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

export default app;
