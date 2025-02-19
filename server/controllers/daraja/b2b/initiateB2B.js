const axios = require("axios");
const { generateAccessToken, getTimeStamp } = require("../../../utils");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const generateSecurityCredentials = (initiatorPassword, timestamp) => {
  const certPath = path.join(
    __dirname,
    "../../../../",
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

const initiateB2B = async (req, res) => {
  const { Amount, PartyB, AccountType } = req.body;
  const b2b_url = "https://api.safaricom.co.ke/mpesa/b2b/v1/paymentrequest";

  const isTillNumber = AccountType == "Paybill" ? false : true;

  const accessToken = await generateAccessToken();
  const timestamp = getTimeStamp();

  const CommandID = isTillNumber ? "BusinessBuyGoods" : "BusinessPayBill";
  const SecurityCredential = generateSecurityCredentials(
    process.env.INITIATOR_PASSWORD,
    timestamp
  );

  const data = {
    Initiator: process.env.INITIATOR_NAME,
    SecurityCredential,
    CommandID: CommandID,
    SenderIdentifierType: "4",
    RecieverIdentifierType: isTillNumber ? "2" : "4",
    Amount: Amount,
    PartyA: process.env.BUSINESS_SHORT_CODE,
    PartyB: PartyB,
    AccountReference: "Deposit",
    Requester: "254748517525",
    Remarks: "ok",
    QueueTimeOutURL: `${process.env.BASE_URL}/api/v1/daraja/b2b-timeouturl`,
    ResultURL: `${process.env.BASE_URL}/api/v1/daraja/b2b-resulturl`,
  };

  try {
    const response = await axios.post(b2b_url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { OriginatorConversationID, ResponseCode, ResponseDescription } =
      response.data;
    if (ResponseCode == "0") {
      res.status(200).json({
        success: true,
        message: "B2B Transaction initiated successfully",
        OriginatorConversationID,
        ResponseCode,
        ResponseDescription,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "B2B Transaction failed",
        ResponseCode,
        ResponseDescription,
      });
    }
  } catch (error) {
    console.error("B2B Transaction failed:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = initiateB2B;
