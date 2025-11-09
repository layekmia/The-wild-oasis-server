const { Schema, model, models } = require("mongoose");

const settingsSchema = new Schema(
  {
    maxBookingLength: { type: Number, required: true },
    minBookingLength: { type: Number, required: true },
    maxGuestsPerBooking: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = models.Setting || model("Setting", settingsSchema);
