const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
    default: "67b75d3aff03e174eb8a5229",
  },
  AppId: {
    type: mongoose.Types.ObjectId,
    ref: "Apps",
    required: true,
    default: "67b75d3aff03e174eb8a5229",
  },
  Amount: { type: Number, required: true },
  KepayAmount: { type: Number },
  myAmount: { type: Number },
  PhoneNumber: { type: String, required: true },
  TransactionId: { type: String },
  Status: {
    type: String,
    enum: ["pending", "funded", "cancelled", "forwading", "forwarded"],
    default: "pending",
  },
  TransactionType: {
    type: String,
    enum: ["Deposit", "Withdrawal"],
    required: true,
  },
  ResultCode: { type: Number },
  ResultDesc: { type: String },
  TransactionDate: { type: Date },
  MerchantRequestID: { type: String },
  CheckoutRequestID: { type: String },
  ReceiverPartyPublicName: { type: String },
  TransactionCompletedDateTime: { type: String },
  ConversationID: { type: String },
  ResponseCode: { type: String },
  ResponseDescription: { type: String },
  OriginatorConversationID: { type: String },
});

const transactions = mongoose.model("transactions", transactionSchema);
module.exports = transactions;
