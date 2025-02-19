require("dotenv").config();
const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { Messages } = require("../../config");
const { sendEmail } = require("../../utils");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const findUser = await Users.findOne({ email });
  if (!findUser) {
    return res.status(400).json({ message: Messages.userNotFound });
  }
  const secret = process.env.JWT_SECRET;
  const payload = {
    id: findUser._id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const url = process.env.APP_URL;

  findUser.passwordResetToken = token;

  await findUser.save();

  const link = `${url}/api/v1/auth/reset-password/${token}`;

  sendEmail({
    to: email,
    subject: "Password Reset",
    html: `<h3><b>Password Reset</b> </h3>
              <div>
                <p>We have received a request to reset your password.</p>
                <p>${link}</p>
                <p>This link expires in 15 minutes</p>
                <p>If this wasn't you, contact the admin to suspend any current transactions until further notice.</p>
                </div>`,
    onError: (e) => res.status(400).json({ message: Messages.requestFailed }),
    onSuccess: (i) =>
      res.status(200).json({ message: Messages.passwordResetEmail }),
  });
};

module.exports = { forgotPassword };
