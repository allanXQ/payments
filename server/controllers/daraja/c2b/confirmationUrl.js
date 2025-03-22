const axios = require("axios");
const { sendPaymentNotification } = require("../../telegram");
const { Transactions } = require("../../../models");

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
    const extractPhoneNumber = (inputString) => {
      const match = inputString.match(/(\+?\d{10,13})/); // Supports +254 and 07********
      return match ? match[0] : null;
    };
    const message = `
    Sender first name: ${FirstName}
    Amount: ${TransAmount}
    Transaction ID: ${TransID}
    Phone Number: ${extractPhoneNumber(BillRefNumber) || BillRefNumber}
    Bill reference number: ${BillRefNumber}\nTime: ${transactionTime}`;
    const myAmount = parseFloat(TransAmount) * (2.5 / 100);
    await Transactions.create({
      Amount: TransAmount,
      Status: "funded",
      PhoneNumber: extractPhoneNumber(BillRefNumber) || BillRefNumber,
      TransactionId: TransID,
      TransactionType: "Deposit",
      KepayAmount: parseFloat(TransAmount) - myAmount,
      myAmount,
    });
    // await sendPaymentNotification(TransID, message);
  } catch (error) {
    console.error(error);
  } finally {
    return null;
  }
};

module.exports = confirmationUrl;
