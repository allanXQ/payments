require("dotenv").config();
const bcrypt = require("bcrypt");
const { Users } = require("../../models");
const { Messages } = require("../../config");
const { setCookies, generateTokens } = require("../../utils");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: Messages.invalidCredentials });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res.status(400).json({ message: Messages.invalidCredentials });
  }
  const tokens = generateTokens(user);
  const userUpdate = await Users.updateOne(
    { email },
    { $set: { refreshToken: tokens.refreshToken } }
  );
  if (userUpdate.nModified === 0) {
    return res.status(400).json({ message: Messages.loginFailed });
  }
  setCookies(res, tokens);
  return res.status(200).json({
    message: Messages.loginSuccess,
  });
};

module.exports = { login };
