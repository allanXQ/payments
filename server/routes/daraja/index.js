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
const initiateBulkB2C = require("../../controllers/daraja/b2c/bulkB2c");
const confirmationUrl = require("../../controllers/daraja/c2b/confirmationUrl");
const registerC2BConfirmationUrl = require("../../controllers/daraja/c2b/registerCallback");
const validationUrl = require("../../controllers/daraja/c2b/validationUrl");
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

router.post("/c2b-confirmation-url", errorHOC(confirmationUrl));
router.post("/c2b-validation-url", errorHOC(validationUrl));
router.get("/register-c2b-urls", errorHOC(registerC2BConfirmationUrl));

router.post(
  "/initiate-b2c",
  // validateApiKey,
  // formValidate(initiateC2BB2CSchema),
  errorHOC(initiateB2C)
);

router.post(
  "/initiate-bulk-b2c",
  // validateApiKey,
  // formValidate(initiateC2BB2CSchema),
  errorHOC(initiateBulkB2C)
);

router.post("/b2c-resulturl", errorHOC(B2CResultURL)); //internal url- make it hard to fuzz
router.post("/initiate-b2b", errorHOC(initiateB2B)); //add yupschema
router.post("/b2b-resulturl", errorHOC(B2BResultURL)); //internal url- make it hard to fuzz
router.post("/b2b-timeouturl", errorHOC(B2BTimeoutURL)); //internal url- make it hard to fuzz

module.exports = router;
