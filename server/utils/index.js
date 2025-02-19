const createId = require("./createId");
const logger = require("./logger");
const errorHOC = require("./errorHOC");
const generateAccessToken = require("./generateAccessToken");
const getTimeStamp = require("./timestamp");
const { generateTokens, setCookies, clearTokens } = require("./cookie");
const {
  sendSuccess,
  sendBadRequest,
  sendServerError,
  sendNotFound,
  sendForbidden,
  sendUnauthorized,
} = require("./responseHandler");
const sendEmail = require("./sendMail");

module.exports = {
  createId,
  logger,
  errorHOC,
  generateAccessToken,
  getTimeStamp,
  generateTokens,
  setCookies,
  clearTokens,
  sendSuccess,
  sendBadRequest,
  sendServerError,
  sendNotFound,
  sendForbidden,
  sendUnauthorized,
  sendEmail,
};
