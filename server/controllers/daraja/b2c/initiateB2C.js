const axios = require("axios");
const { generateAccessToken, getTimeStamp } = require("../../../utils");
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

const initiateB2C = async (req, res) => {
  try {
    const { PhoneNumber, Amount } = req.body;
    const accessToken = await generateAccessToken();

    const url = `https://api.safaricom.co.ke/mpesa/b2c/v3/paymentrequest`;
    const timestamp = getTimeStamp();
    const SecurityCredential = generateSecurityCredentials(
      process.env.INITIATOR_PASSWORD,
      timestamp
    );

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

    const response = await axios
      .post(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {});
    const transaction = { ...data, ...dbData, ...response.data };

    // 🔹 Wait for transactions to be created AFTER API calls complete
    await Transactions.create(transaction);

    return res.status(200).json({ message: Messages.transactionInitiated });
  } catch (error) {
    console.error("Main Function Error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = initiateB2C;
