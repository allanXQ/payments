const { Messages } = require("../../config");
const { Apps } = require("../../models");
const mongoose = require("mongoose");

const createApp = async (req, res) => {
  const { Name, C2BCallbackURL, AccountNumber, AccountType } = req.body;
  const userId = req.userId;

  const app = await Apps.create({
    UserId: new mongoose.Types.ObjectId(userId),
    Name,
    C2BCallbackURL,
    AccountNumber,
    AccountType,
  });

  return res.status(200).json({ message: Messages.appCreateSuccess });
};

module.exports = createApp;
