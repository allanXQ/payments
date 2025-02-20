const { createApp } = require("../../controllers/app");
const { verifyjwt, formValidate } = require("../../middleware");
const { errorHOC } = require("../../utils");
const { createAppSchema } = require("../../yupschemas");

const Router = require("express").Router();

Router.post(
  "/create-app",
  // verifyjwt,
  formValidate(createAppSchema),
  errorHOC(createApp)
);

module.exports = Router;
