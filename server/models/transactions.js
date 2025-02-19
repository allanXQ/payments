const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  UserId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  AppId: { type: mongoose.Types.ObjectId, ref: "Apps", required: true },
  Amount: { type: Number, required: true },
  PhoneNumber: { type: String, required: true },
  MpesaRef: { type: String },
  Status: {
    type: String,
    enum: ["pending", "funded", "cancelled", "forwading", "forwarded"],
    default: "pending",
  },
  ResultCode: { type: Number },
  ResultDesc: { type: String },
  TransactionDate: { type: Date },
  MerchantRequestID: { type: String, required: true },
  CheckoutRequestID: { type: String, required: true },
});

const transactions = mongoose.model("transactions", transactionSchema);
module.exports = transactions;
