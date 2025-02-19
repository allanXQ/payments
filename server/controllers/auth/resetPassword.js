require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const { Messages } = require("../../config");

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!token || !password) {
    return res.status(400).json({ message: Messages.badRequest });
  }
  let userId;
  const secret = process.env.JWT_SECRET;
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(401).json({ message: Messages.invalidToken });
    }
    userId = user.id;
  });
  const getUser = await Users.findOne({ _id: userId });
  if (!getUser) {
    console.log(userId);

    return res.status(400).json({ message: Messages.invalidToken });
  }
  const passwordResetToken = getUser.passwordResetToken;
  if (passwordResetToken !== token) {
    return res.status(400).json({ message: Messages.badRequest });
  }

  const hashedpassword = await bcrypt.hash(password, 10);
  const userUpdate = await Users.findOneAndUpdate(
    { _id: userId },
    {
      $set: { password: hashedpassword, passwordResetToken: "" },
    },
    { new: true }
  );
  if (!userUpdate) {
    return res.status(400).json({ message: Messages.passwordResetFailed });
  }
  res.status(200).json({ message: Messages.passwordResetSuccessful });
};

module.exports = { resetPassword };
