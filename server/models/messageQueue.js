const mongoose = require("mongoose");

const MessageQueue = mongoose.Schema({
  message: { type: String, required: true },
});

const model = mongoose.model("MessageQueue", MessageQueue);

module.exports = model;
