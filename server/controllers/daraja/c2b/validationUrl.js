const validationUrl = async (req, res) => {
  console.log(req.body);
  return res.json({
    ResultCode: "0",
    ResultDesc: "Accepted",
  });
};

module.exports = validationUrl;
