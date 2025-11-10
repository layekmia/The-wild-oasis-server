import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const guestSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String },
    nationalID: { type: String, default: null },
    countryFlag: { type: String, default: null },
    nationality: { type: String, default: null },
  },
  { timestamps: true }
);

export default models.Guest || model("Guest", guestSchema);
