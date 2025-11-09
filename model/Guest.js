const { Schema, model } = require("mongoose");

const GuestSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nationalID: { type: String, default: null },
    countryFlag: { type: String, default: null },
    nationality: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = model("Guest", GuestSchema);
