require("dotenv").config();
const { Messages } = require("../../../config");

const { Transactions, Apps } = require("../../../models");
const mongoose = require("mongoose");
const axios = require("axios");

const whitelist = [
  "196.201.214.200",
  "196.201.214.206",
  "196.201.213.114",
  "196.201.214.207",
  "196.201.214.208",
  "196.201.213.44",
  "196.201.212.127",
  "196.201.212.138",
  "196.201.212.129",
  "196.201.212.136",
  "196.201.212.74",
  "196.201.212.69",
];

const initiateB2B = async (App) => {
  try {
    const b2bURL = process.env.B2B_URL;
    const b2bPayload = {
      Amount: metadata.Amount,
      PartyB: App.AccountNumber,
      AccountType: App.AccountType,
    };
    const response = await axios.post(b2bURL, b2bPayload);
    if (response.status == 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const darajaWebhook = async (req, res) => {
  const ip = req.headers["x-forwarded-for"]
    ?.split(",")
    ?.map((ip) => ip.trim())[1];
  if (!whitelist.includes(ip)) {
    console.log("IP not allowed");
    return res.status(403).json({ message: Messages.forbidden });
  }

  const { stkCallback } = req.body.Body;
  const {
    MerchantRequestID,
    CheckoutRequestID,
    ResultCode,
    ResultDesc,
    CallbackMetadata,
  } = stkCallback;

  let metadata = {};
  if (CallbackMetadata && CallbackMetadata.Item) {
    CallbackMetadata.Item.forEach((item) => {
      metadata[item.Name] = item.Value;
    });
  }

  if (ResultCode == 0) {
    const TransactionUpdate = await Transactions.findOneAndUpdate(
      {
        MerchantRequestID,
        CheckoutRequestID,
      },
      {
        status: "funded",
      }
    );
    const TransactionUserId = TransactionUpdate.UserId;
    const App = await Apps.findOne({ _id: TransactionUserId });
    const b2bresult = await initiateB2B(App);
    if (!b2bresult) {
      await axios.post(App.C2BCallbackURL, {
        message: "B2B transaction failed",
        payload: {
          MerchantRequestID,
          PhoneNumber: metadata.PhoneNumber,
          Amount: metadata.Amount,
          ResultCode: 500,
          ResultDesc: "Internal Server Error",
          TransactionDate: new Date(),
        },
      });
      //add transaction to failed b2b transactions for retry
    }
  }
  return res.status(200).json({ message: Messages.requestSuccessful });
};

module.exports = darajaWebhook;
