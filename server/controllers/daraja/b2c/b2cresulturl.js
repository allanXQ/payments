const B2CResultURL = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

module.exports = B2CResultURL;
