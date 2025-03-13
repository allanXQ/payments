const mongoose = require("mongoose");

const MessageQueue = mongoose.Schema({
  transID: { type: String, required: true },
  message: { type: String, required: true },
  lastUpdateTime: { type: Date, default: new Date().toLocaleString() },
});

const model = mongoose.model("MessageQueue", MessageQueue);

module.exports = model;
