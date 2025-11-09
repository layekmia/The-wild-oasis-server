const { Types } = require("mongoose");
const Booking = require("../model/booking");
const Cabin = require("../model/cabin");
const { eachDayOfInterval } = require("date-fns");

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
    return res.status(400).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.getBookedDates = async (req, res) => {
  const cabinId = req.params.id;

  if (!cabinId) {
    return res
      .status(400)
      .json({ success: false, message: "cabin id is required" });
  } else if (!Types.ObjectId.isValid(cabinId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid booking id" });
  }

  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const bookings = await Booking.find({
      cabinId,
      endDate: { $gte: today },
      status: { $in: ["confirmed", "checked-in"] },
    });

    if (!bookings.length) {
      return res
        .status(400)
        .json({ success: false, message: "No booked date found" });
    }

    console.log(bookings);

    const bookedDates = bookings
      .map((booking) =>
        eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        })
      )
      .flat();

    return res.status(201).json(bookedDates);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};

exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const updateData = req.body;

  if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid bookingId" });
  }

  // Prevent updating certain fields
  const allowedFields = [
    "startDate",
    "endDate",
    "numGuests",
    "numNights",
    "cabinPrice",
    "extraPrice",
    "totalPrice",
    "hasBreakfast",
    "isPaid",
    "status",
    "observations",
  ];
  const filteredData = {};
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined)
      filteredData[field] = updateData[field];
  });

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      filteredData,
      { new: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json({ booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating booking",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  const id = req.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing booking ID" });
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json(deletedBooking);
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
