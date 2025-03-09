const { generateAccessToken, getTimeStamp } = require("../../../utils");

const registerC2BCallback = (req, res) => {
  app.get("/register-c2b-urls", async (req, res) => {
    const token = await generateAccessToken();
    const url = "https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl";

    const payload = {
      ShortCode: process.env.BUSINESS_SHORT_CODE,
      ResponseType: "Completed",
      ConfirmationURL: `${process.env.CALLBACK_URL}/mpesa/confirmation`,
      ValidationURL: `${process.env.CALLBACK_URL}/mpesa/validation`,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  });
};

module.exports = registerC2BCallback;
