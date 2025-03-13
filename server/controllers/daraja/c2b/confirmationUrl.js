const axios = require("axios");
const { sendPaymentNotification } = require("../../telegram");

const confirmationUrl = async (req, res) => {
  try {
    const {
      FirstName,
      MSISDN,
      TransTime,
      TransAmount,
      TransID,
      BillRefNumber,
    } = req.body;
    console.log(req.body);
    // 20250312213418
    const transactionTime = new Date(TransTime).toLocaleString();
    const message = `Sender first name: ${FirstName}
    \nAmount: ${TransAmount}
    \nTransaction ID: ${TransID}
    \nBill reference number: ${BillRefNumber}\nTime: ${transactionTime}`;
    sendPaymentNotification(message);
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
};

module.exports = confirmationUrl;
