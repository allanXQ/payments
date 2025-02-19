const mongoose = require("mongoose");

const isLocalAuth = function () {
  return this.authMethod === "local";
};

const Users = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    authMethod: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },
    refreshToken: { type: String },
    passwordResetToken: { type: String },
    apiKey: { type: String },
    password: { type: String, required: isLocalAuth },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Users", Users);

module.exports = model;
