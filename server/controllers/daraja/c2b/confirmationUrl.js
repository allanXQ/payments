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
    // 20250312213418
    const transactionTime = `${TransTime.slice(0, 4)}-${TransTime.slice(
      4,
      6
    )}-${TransTime.slice(6, 8)
      .concat(" ")
      .concat(TransTime.slice(8, 10))
      .concat(":")
      .concat(TransTime.slice(10, 12))
      .concat(":")
      .concat(TransTime.slice(12, 14))}`;
    const message = `Sender first name: ${FirstName}
    Amount: ${TransAmount}
    Transaction ID: ${TransID}
    Bill reference number: ${BillRefNumber}\nTime: ${transactionTime}`;
    await sendPaymentNotification(TransID, message);
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
};

module.exports = confirmationUrl;
