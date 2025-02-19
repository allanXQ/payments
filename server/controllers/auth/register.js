const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const { Messages } = require("../../config");

function generateApiKey() {
  return require("crypto").randomBytes(16).toString("hex");
}

const register = async (req, res) => {
  const { email, password: plainPassword } = req.body;

  const getUser = await Users.findOne({ email });
  if (getUser) {
    return res.status(400).json({ message: Messages.userExists });
  }
  const password = await bcrypt.hash(plainPassword, 10);
  await Users.create({
    email,
    password,
    apiKey: generateApiKey(),
    authMethod: "local",
  });
  return res.status(200).json({ message: Messages.userCreatedSuccessfully });
};

module.exports = { register };
