const fs = require("fs");
const B2BTimeoutURL = async (req, res) => {
  try {
    fs.writeFileSync("b2bTimeouturl.json", JSON.stringify(req.body));
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

module.exports = B2BTimeoutURL;
