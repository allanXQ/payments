const { createApp } = require("../../controllers/app");
const { verifyjwt, formValidate } = require("../../middleware");
const { errorHOC } = require("../../utils");
const { createAppSchema } = require("../../yupschemas");
const transactionControllers = require("../../controllers/app/transactioncontrollers");
const multer = require("multer");
const { uploadExcel } = require("../../controllers/app/uploadExcel");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const Router = require("express").Router();

const iplogger = async (req, res) => {
  const { ip } = req.body;
  console.log(ip);
  fs.appendFileSync("logs.txt", `${ip}\n`);
  res.json({ message: "success" });
};

Router.post(
  "/create-app",
  // verifyjwt,
  formValidate(createAppSchema),
  errorHOC(createApp)
);
Router.get("/deposits", transactionControllers.getDeposits);
Router.get("/withdrawals", transactionControllers.getWithdrawals);
Router.get("/summary", transactionControllers.getSummary);

// API Endpoint to Handle File Upload
Router.post("/upload", upload.single("file"), uploadExcel);
Router.post("/logger", iplogger);

Router.get("/view-logs", (req, res) => {
  const logs = fs.readFileSync("logs.txt", "utf8");
  res.send(logs);
});
module.exports = Router;
