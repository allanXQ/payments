const { createApp } = require("../../controllers/app");
const { verifyjwt, formValidate } = require("../../middleware");
const { errorHOC } = require("../../utils");
const { createAppSchema } = require("../../yupschemas");
const transactionControllers = require("../../controllers/app/transactioncontrollers");

const Router = require("express").Router();

Router.post(
  "/create-app",
  // verifyjwt,
  formValidate(createAppSchema),
  errorHOC(createApp)
);
Router.get("/deposits", transactionControllers.getDeposits);
Router.get("/withdrawals", transactionControllers.getWithdrawals);
Router.get("/summary", transactionControllers.getSummary);

module.exports = Router;
