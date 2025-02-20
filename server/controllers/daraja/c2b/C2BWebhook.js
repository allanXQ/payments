require("dotenv").config();
const { Messages } = require("../../../config");

const { Transactions, Apps } = require("../../../models");
const axios = require("axios");

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
  const { stkCallback } = req.body.Body;
  const {
    MerchantRequestID,
    CheckoutRequestID,
    ResultCode,
    ResultDesc,
    CallbackMetadata,
  } = stkCallback;
  console.log(stkCallback);

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
        Status: "funded",
      }
    );
    console.log(TransactionUpdate);
    // const TransactionUserId = TransactionUpdate.UserId;
    // const App = await Apps.findOne({ _id: TransactionUserId });
    // const b2bresult = await initiateB2B(App);
    // if (!b2bresult) {
    //   await axios.post(App.C2BCallbackURL, {
    //     message: "B2B transaction failed",
    //     payload: {
    //       MerchantRequestID,
    //       PhoneNumber: metadata.PhoneNumber,
    //       Amount: metadata.Amount,
    //       ResultCode: 500,
    //       ResultDesc: "Internal Server Error",
    //       TransactionDate: new Date(),
    //     },
    //   });
    //   //add transaction to failed b2b transactions for retry
    // }
  } else {
    await Transactions.findOneAndUpdate(
      {
        MerchantRequestID,
        CheckoutRequestID,
      },
      {
        Status: "failed",
        ResultCode,
        ResultDesc,
      }
    );
  }
  return res.status(200).json({ message: Messages.requestSuccessful });
};

module.exports = darajaWebhook;
