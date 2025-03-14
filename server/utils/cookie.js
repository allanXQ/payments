const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokens = (user) => {
  const payload = { userId: user._id };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "24h",
  });
  return { accessToken, refreshToken };
};

const setCookies = (res, tokens) => {
  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    sameSite: "None",
    path: "/api/v1/auth/refresh-token",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const clearTokens = (res) => {
  res.cookie("accessToken", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.cookie("refreshToken", "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/api/v1/auth/refresh-token",
    secure: true,
    sameSite: "None",
  });
};

module.exports = { generateTokens, setCookies, clearTokens };
