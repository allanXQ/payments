const { Users } = require("../../models");
const { Messages } = require("../../config");
const { clearTokens } = require("../../utils");

const logout = async (req, res) => {
  const userId = req.userId;
  const user = await Users.findOneAndUpdate(
    { _id: userId },
    {
      $set: { refreshToken: null },
    },
    { new: true }
  );
  if (!user) {
    clearTokens(res);
    return res.status(401).json({ message: Messages.invalidToken });
  }
  clearTokens(res);
  return res.status(200).json({ message: Messages.logOutSuccess });
};

module.exports = { logout };
