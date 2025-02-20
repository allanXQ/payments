const mongoose = require("mongoose");
const { Transactions } = require("../../models");

const transactionControllers = {
  getDeposits: (req, res) => {
    Transactions.find({ TransactionType: "Deposit" })
      .then((deposits) => {
        res.status(200).json({ deposits });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  },
  getWithdrawals: (req, res) => {
    Transactions.find({ TransactionType: "Withdrawal" })
      .then((withdrawals) => {
        res.status(200).json({ withdrawals });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  },
  getSummary: (req, res) => {
    Transactions.aggregate([
      {
        $group: {
          _id: "$TransactionType",
          total: { $sum: "$Amount" },
          totalFundedDeposits: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$TransactionType", "Deposit"] },
                    { $eq: ["$Status", "funded"] },
                  ],
                },
                "$Amount",
                0,
              ],
            },
          },
          totalPendingDeposits: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$TransactionType", "Deposit"] },
                    { $eq: ["$Status", "pending"] },
                  ],
                },
                "$Amount",
                0,
              ],
            },
          },
          totalFundedWithdrawals: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$TransactionType", "Withdrawal"] },
                    { $eq: ["$Status", "funded"] },
                  ],
                },
                "$Amount",
                0,
              ],
            },
          },
          totalPendingWithdrawals: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$TransactionType", "Withdrawal"] },
                    { $eq: ["$Status", "pending"] },
                  ],
                },
                "$Amount",
                0,
              ],
            },
          },
        },
      },
    ])
      .then((summary) => {
        res.status(200).json({ summary });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  },
};

module.exports = transactionControllers;
