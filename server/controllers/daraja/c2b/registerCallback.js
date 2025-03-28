const { server_url } = require("../../../config");
const { generateAccessToken, getTimeStamp } = require("../../../utils");
const axios = require("axios");

const registerC2BConfirmationUrl = async (req, res) => {
  const accessToken = await generateAccessToken();
  const auth = `Bearer ${accessToken}`;
  const url = "https://api.safaricom.co.ke/mpesa/c2b/v2/registerurl";

  const payload = {
    ShortCode: process.env.BUSINESS_SHORT_CODE,
    ResponseType: "Completed",
    ConfirmationURL: `${process.env.PROD_SERVER_URL}/api/v1/daraja/c2b-confirmation-url`,
    ValidationURL: `${process.env.PROD_SERVER_URL}/api/v1/daraja/c2b-validation-url`,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = registerC2BConfirmationUrl;
