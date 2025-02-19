const initiateB2B = require("./b2b/initiateB2B");
const B2BResultURL = require("./b2b/b2bresulturl");
const initiateB2C = require("./b2c/initiateB2C");
const B2CResultURL = require("./b2c/b2cresulturl");
const C2BWebhook = require("./c2b/C2BWebhook");
const initiateC2B = require("./c2b/initiateC2B");
const testcallback = require("./testcallback");
const B2BTimeoutURL = require("./b2b/b2btimeouturl");

module.exports = {
  C2BWebhook,
  initiateC2B,
  testcallback,
  initiateB2C,
  B2CResultURL,
  initiateB2B,
  B2BResultURL,
  B2BTimeoutURL,
};
