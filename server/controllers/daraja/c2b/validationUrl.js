const validationUrl = async (req, res) => {
  try {
    console.log(req.body);
    res.json({
      ResultCode: "0",
      ResultDesc: "Accepted",
    });
  } catch (error) {
    console.error(error);
    res.json({
      ResultCode: "0",
      ResultDesc: "Accepted",
    });
  }
};

module.exports = validationUrl;
