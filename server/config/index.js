const Messages = require("./messages");
const fs = require("fs");
const path = require("path");

const ENV = process.env.ENV;
const DEV_SERVER_URL = process.env.DEV_SERVER_URL;
const PROD_SERVER_URL = process.env.PROD_SERVER_URL;
const server_url = ENV === "dev" ? DEV_SERVER_URL : PROD_SERVER_URL;

const allowedOrigins = [
  //add only client ips here. remove these and whitelist in nginx
  "196.201.214.200",
  "196.201.214.206",
  "196.201.213.114",
  "196.201.214.207",
  "196.201.214.208",
  "196.201.213.44",
  "196.201.212.127",
  "196.201.212.138",
  "196.201.212.129",
  "196.201.212.136",
  "196.201.212.74",
  "196.201.212.69",
  "http://localhost:5173",
  server_url,
];

const walletConfig = {
  minDeposit: 9,
  maxDeposit: 100000,
  minWithdrawal: 10,
  maxWithdrawal: 100000,
  withdrawalFee: 0,
  depositFee: 0,
  withdrawalFeePercentage: 0,
  depositFeePercentage: 0,
};

module.exports = {
  allowedOrigins,
  Messages,
  walletConfig,
  server_url,
};
