const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"], // allow only my front-end
    credentials: true, // allow cookies or tokens if needed
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The Wild Oasis Website Backend is working");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
