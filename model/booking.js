const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    numGuests: { type: Number, required: true },
    numNights: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    cabinPrice: { type: Number, required: true },
    extraPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    hasBreakfast: { type: Boolean, required: true },
    isPaid: { type: Boolean, required: true },
    observations: { type: String },
    cabinId: { type: Schema.Types.ObjectId, ref: "Cabin", required: true },
    guestId: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    status: {
      type: String,
      enum: ["confirmed", "unconfirmed"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Booking", bookingSchema);

