const confirmationUrl = (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: "Confirmation URL received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error receiving confirmation URL" });
  }
};

module.exports = confirmationUrl;
