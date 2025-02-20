// controllers/lipanampesa.js
require("dotenv").config();
const axios = require("axios");
const { generateAccessToken, getTimeStamp } = require("../../../utils");
const { Transactions } = require("../../../models");
const { default: mongoose } = require("mongoose");
const { Messages } = require("../../../config");

const initiateC2B = async (req, res) => {
  const accessToken = await generateAccessToken();
  const timestamp = getTimeStamp();
  const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const auth = `Bearer ${accessToken}`;
  const password = Buffer.from(
    `${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`
  ).toString("base64");
  const CallBackURL = `${process.env.SERVER_URL}/api/v1/daraja/c2b-webhook`;
  const userId = req.userId;
  const { Amount, PhoneNumber, AppId } = req.body;

  const stkpush = await axios.post(
    url,
    {
      BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Amount,
      PartyA: PhoneNumber,
      PartyB: process.env.PARTYB,
      PhoneNumber,
      CallBackURL,
      AccountReference: "test",
      TransactionDesc: "Mpesa Daraja API stk push test",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    }
  );

  const stkData = stkpush.data;
  if (!stkData) {
    return res.status(400).json({ message: Messages.transactionFailed });
  }

  if (stkData.ResponseCode !== "0") {
    return res.status(400).json({ message: Messages.transactionFailed });
  }

  await Transactions.create({
    UserId: new mongoose.Types.ObjectId(AppId),
    AppId: new mongoose.Types.ObjectId(AppId),
    Amount,
    Status: "pending",
    PhoneNumber,
    TransactionType: "Deposit",
    MerchantRequestID: stkData.MerchantRequestID,
    CheckoutRequestID: stkData.CheckoutRequestID,
  });

  return res.status(200).json({ message: Messages.transactionInitiated });
};

module.exports = initiateC2B;
