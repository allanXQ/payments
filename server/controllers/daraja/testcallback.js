const testcallback = async (req, res) => {
  console.log(req.body);
  return res.status(200).json({ message: "success" });
};

module.exports = testcallback;
