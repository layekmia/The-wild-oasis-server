import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const settingsSchema = new Schema(
  {
    maxBookingLength: { type: Number, required: true },
    minBookingLength: { type: Number, required: true },
    maxGuestsPerBooking: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Setting || model("Setting", settingsSchema);
