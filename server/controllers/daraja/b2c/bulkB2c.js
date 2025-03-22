const axios = require("axios");
const { generateAccessToken, getTimeStamp, logger } = require("../../../utils");
const crypto = require("crypto");
const { Messages, server_url } = require("../../../config");
const fs = require("fs");
const path = require("path");
const { Transactions } = require("../../../models");

const generateSecurityCredentials = (initiatorPassword, timestamp) => {
  const certPath = path.join(
    __dirname,
    "../../../",
    "ProductionCertificate.cer"
  );
  const publicKey = fs.readFileSync(certPath, "utf8");
  const buffer = Buffer.from(initiatorPassword);
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );

  return encrypted.toString("base64");
};

const initiateBulkB2C = async (req, res) => {
  try {
    const { recipients } = req.body;
    const accessToken = await generateAccessToken();

    const url = `https://api.safaricom.co.ke/mpesa/b2c/v3/paymentrequest`;
    const timestamp = getTimeStamp();
    const SecurityCredential = generateSecurityCredentials(
      process.env.INITIATOR_PASSWORD,
      timestamp
    );

    const transactions = [];

    const initiateTransaction = async (PhoneNumber, Amount) => {
      const data = {
        InitiatorName: process.env.INITIATOR_NAME,
        OriginatorConversationID: crypto.randomBytes(10).toString("hex"),
        SecurityCredential,
        CommandID: "BusinessPayment",
        Amount,
        PartyA: process.env.BUSINESS_SHORT_CODE,
        PartyB: PhoneNumber,
        Remarks: "Payment",
        QueueTimeOutURL: `${server_url}/api/v1/daraja/b2c-timeouturl`,
        ResultURL: `${server_url}/api/v1/daraja/b2c-resulturl`,
        Occasion: "Payment",
      };

      const dbData = {
        UserId: "67b75d3aff03e174eb8a5229",
        AppId: "67b75d3aff03e174eb8a5229",
        Status: "pending",
        TransactionType: "Withdrawal",
        PhoneNumber,
      };

      try {
        const response = await axios.post(url, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        transactions.push({
          ...data,
          ...dbData,
          ...response.data,
        });
      } catch (error) {
        logger.error("Axios Error:", error);
        throw new Error(error);
      }
    };

    // 🔹 Use `for...of` to properly handle async transactions
    async function processTransactions(recipients, delay) {
      for (const recipient of recipients) {
        let phoneNumber = recipient.PhoneNumber;

        if (phoneNumber.startsWith("07")) {
          phoneNumber = phoneNumber.replace(/^07/, "2547");
        } else if (phoneNumber.startsWith("01")) {
          phoneNumber = phoneNumber.replace(/^01/, "2541");
        }
        await initiateTransaction(phoneNumber, recipient.Amount);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Add interval
      }
    }

    // Example usage with a 2-second delay (2000ms)
    processTransactions(recipients, 5000);

    // 🔹 Wait for transactions to be created AFTER API calls complete
    if (transactions.length > 0) {
      try {
        await Transactions.insertMany(transactions);
        console.log(
          "Transactions successfully saved to database:",
          transactions
        );
      } catch (dbError) {
        console.error("Database Error:", dbError);
      }
    } else {
      console.warn("No transactions were created!");
    }

    return res.status(200).json({ message: "Bulk transactions initiated" });
  } catch (error) {
    console.error("Main Function Error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = initiateBulkB2C;
