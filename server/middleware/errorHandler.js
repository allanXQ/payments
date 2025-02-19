const { clearTokens, logger } = require("../utils");
const { Messages } = require("../config");
const {
  sendServerError,
  sendUnauthorized,
  sendBadRequest,
} = require("../utils");

const errorHandler = (error, req, res, next) => {
  const logContext = {
    metadata: error,
    stack: error.stack,
    name: error.name,
    method: req.method,
    url: req.originalUrl,
    userId: req.userId || "Unauthenticated",
  };

  switch (error.name) {
    case "YupValidationError":
      logger.error(error.message, logContext);
      return sendBadRequest(res, error.message, error.name);
    case "TokenExpiredError":
      const { path } = req.route;
      if (path === "/api/v1/auth/logout") {
        clearTokens(res);
      }
      logger.error(error.message, logContext);
      return sendUnauthorized(res, Messages.tokenExpired);
    case "RefreshTokenExpiredError":
      logger.error(error.message, logContext);
      return sendUnauthorized(res, Messages.tokenExpired);
    case "ApiKeyValidationError":
      logger.warn(error.message, logContext);
      return sendUnauthorized(res, Messages.ApiKeyValidationError);
    default:
      logger.error(error.message, logContext);
      return sendServerError(res, Messages.serverError);
  }
};

module.exports = errorHandler;
