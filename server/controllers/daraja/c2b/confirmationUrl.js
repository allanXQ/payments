const confirmationUrl = (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error receiving confirmation URL" });
  }
};

module.exports = confirmationUrl;
