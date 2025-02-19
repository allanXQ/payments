const router = require("express").Router();

const {
  C2BWebhook,
  initiateC2B,
  initiateB2C,
  resulturl,
  initiateB2B,
  B2BResultURL,
  B2CResultURL,
  B2BTimeoutURL,
} = require("../../controllers/daraja");
const { validateApiKey, formValidate } = require("../../middleware");
const { errorHOC } = require("../../utils");
const { initiateC2BB2CSchema } = require("../../yupschemas");

router.post(
  "/initiate-c2b",
  // validateApiKey,
  formValidate(initiateC2BB2CSchema),
  errorHOC(initiateC2B)
);
router.post("/c2b-webhook", errorHOC(C2BWebhook)); //internal url- make it hard to fuzz

router.post(
  "/initiate-b2c",
  // validateApiKey,
  formValidate(initiateC2BB2CSchema),
  errorHOC(initiateB2C)
);

router.post("/b2c-resulturl", errorHOC(B2CResultURL)); //internal url- make it hard to fuzz

router.post("/initiate-b2b", errorHOC(initiateB2B)); //add yupschema
router.post("/b2b-resulturl", errorHOC(B2BResultURL)); //internal url- make it hard to fuzz
router.post("/b2b-timeouturl", errorHOC(B2BTimeoutURL)); //internal url- make it hard to fuzz

module.exports = router;
