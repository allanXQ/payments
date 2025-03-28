require("dotenv").config();
// require("./controllers/telegram/resendMsgCron");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler } = require("./middleware");
const { allowedOrigins, server_url } = require("./config");
const axios = require("axios");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { logger } = require("./utils");
const path = require("path");

const app = express();
const port = process.env.PORT || 5005;

app.use(helmet());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; connect-src 'self' ${server_url} https://api64.ipify.org; frame-ancestors 'self'; script-src 'self' 'unsafe-inline';`
  );
  next();
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/app", require("./routes/app"));
app.use("/api/v1/daraja", require("./routes/daraja"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.use(errorHandler);

const pingInterval = 840000; // 14 minutes in milliseconds

function pingSelf() {
  axios
    .get("https://payments-3z6q.onrender.com/")
    .then((response) => {
      console.log("Service pinged successfully:", response.status);
    })
    .catch((error) => {
      console.error("Error pinging service:", error);
    });
}

setInterval(pingSelf, pingInterval);
process.on("warning", (e) => console.warn(e.stack));

(async () => {
  return mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      logger.info("Connected to database");
      app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
      });
    })
    .catch((error) => {
      logger.error(error);
    });
})();
