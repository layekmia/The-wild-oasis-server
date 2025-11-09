import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const guestSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nationalID: { type: String, default: null },
    countryFlag: { type: String, default: null },
    nationality: { type: String, default: null },
  },
  { timestamps: true }
);

export default models.Guest || model("Guest", guestSchema);
