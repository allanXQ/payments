const { Users } = require("../models");
const { Messages } = require("../config");
const { sendUnauthorized } = require("../utils");

const validateapikey = async (req, res, next) => {
  try {
    const apiKey = req.header("Authorization")?.replace("Bearer ", "");
    if (!apiKey) {
      return sendUnauthorized(res, Messages.ApiKeyValidationError);
    }
    const user = await Users.findOne({ apiKey });

    if (!user) {
      return sendUnauthorized(res, Messages.ApiKeyValidationError);
    }

    req.userId = user._id;
    next();
  } catch (error) {
    const ApiKeyValidationError = new Error(error.message);
    ApiKeyValidationError.name = "ApiKeyValidationError";
    next(ApiKeyValidationError);
  }
};

module.exports = validateapikey;
