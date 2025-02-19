const { Messages } = require("../config");

const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? Messages.success : Messages.error,
    message,
    data,
  });
};

const sendSuccess = (res, data, message = Messages.requestSuccessful) => {
  sendResponse(res, 200, data, message);
};

const sendBadRequest = (res, message = Messages.badRequest, type) => {
  sendResponse(res, 400, null, message, type || Messages.badRequest);
};

const sendServerError = (res, message = Messages.serverError) => {
  sendResponse(res, 500, null, message);
};

const sendNotFound = (res, message = Messages.notFound) => {
  sendResponse(res, 404, null, message);
};

const sendForbidden = (res, message = Messages.forbidden) => {
  sendResponse(res, 403, null, message);
};

const sendUnauthorized = (res, message = Messages.unauthorized) => {
  sendResponse(res, 401, null, message);
};

const responses = {
  sendSuccess,
  sendBadRequest,
  sendServerError,
  sendNotFound,
  sendForbidden,
  sendUnauthorized,
};

module.exports = responses;
