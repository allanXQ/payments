const fs = require("fs");
const B2BResultURL = async (req, res) => {
  try {
    fs.writeFileSync("b2bresulturl.json", JSON.stringify(req.body));
    console.log("B2B Result URL:", req.body);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

module.exports = B2BResultURL;
