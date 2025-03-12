const axios = require("axios");

const confirmationUrl = async (req, res) => {
  try {
    console.log(req.body);
    await axios.post(
      "https://c007-102-214-72-6.ngrok-free.app/api/v1/daraja/c2b-validation-url",
      {
        message: req.body,
      }
    );
    res.json({ message: req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error receiving confirmation URL" });
  }
};

module.exports = confirmationUrl;
