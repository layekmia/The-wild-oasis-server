const { Types } = require("mongoose");
const Booking = require("../model/booking");
const Cabin = require("../model/cabin");

exports.createBooking = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      numNights,
      cabinPrice,
      cabinId,
      guestId,
      numGuests,
      observations,
      extraPrice = 0,
      totalPrice,
      isPaid = false,
      hasBreakfast = false,
      status = "unconfirmed",
    } = req.body;

    if (
      !startDate ||
      !endDate ||
      !numNights ||
      !cabinPrice ||
      !cabinId ||
      !guestId ||
      !numGuests ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking fields",
      });
    }

    const booking = await Booking.create({
      startDate,
      endDate,
      numNights,
      cabinPrice,
      cabinId,
      guestId,
      numGuests,
      observations,
      extraPrice,
      totalPrice,
      isPaid,
      hasBreakfast,
      status,
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a booking due to some internal issue",
    });
  }
};

exports.getBookings = async (req, res) => {
  const { guestId } = req.query;

  if (!guestId) {
    return res
      .status(400)
      .json({ success: false, message: "Guest id is required" });
  } else if (!Types.ObjectId.isValid(guestId)) {
    return res.status(400).json({ success: false, message: "Invalid guestId" });
  }

  try {
    const bookings = await Booking.find({ guestId })
      .select(
        "createdAt startDate endDate numNights numGuests totalPrice guestId cabinId"
      )
      .populate("cabinId", "name image")
      .sort({ startDate: 1 })
      .lean();

    if (!bookings || bookings.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No booking found" });
    }

    return res.status(201).json(bookings);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.getBooking = async (req, res) => {
  const bookingId = req.params.id;

  if (!bookingId) {
    return res
      .status(400)
      .json({ success: false, message: "booking id is required" });
  } else if (!Types.ObjectId.isValid(bookingId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid booking id" });
  }

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res
        .status(400)
        .json({ success: false, message: "booking not found" });

    return res.status(200).json(booking);
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({
        success: false,
        message: error.message || "Internal server error",
      });
  }
};
