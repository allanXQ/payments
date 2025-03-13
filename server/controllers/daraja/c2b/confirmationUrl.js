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
    const formatDate = (dateString) => {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      const hours = dateString.substring(8, 10);
      const minutes = dateString.substring(10, 12);
      const seconds = dateString.substring(12, 14);

      const dateObj = new Date(
        `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
      );

      return dateObj.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    };

    const transactionTime = formatDate(TransTime);
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
