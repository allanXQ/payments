const mongoose = require("mongoose");

const { Schema } = mongoose;

const appsSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    C2BCallbackURL: {
      type: String,
      required: true,
    },
    AccountNumber: {
      type: Number,
      required: true,
    },
    AccountType: {
      type: String,
      enum: ["Paybill", "TillNumber"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Apps = mongoose.model("Apps", appsSchema);

module.exports = Apps;
