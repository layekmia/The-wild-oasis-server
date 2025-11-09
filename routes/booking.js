const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
} = require("../controller/booking.controller");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:bookingId", getBooking);

module.exports = router;
