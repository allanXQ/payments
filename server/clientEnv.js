require("dotenv").config();
const fs = require("fs");
const path = require("path");

const writeClientEnv = () => {
  const urlpath = "/api/v1";
  const VITE_ENV = process.env.ENV;
  const VITE_DEV_SERVER_URL = process.env.DEV_SERVER_URL + urlpath;
  const VITE_PROD_SERVER_URL = process.env.PROD_SERVER_URL + urlpath;

  fs.writeFileSync(
    path.join(__dirname, "../client/.env"),
    `VITE_ENV=${VITE_ENV}
    VITE_DEV_SERVER_URL=${VITE_DEV_SERVER_URL}
    VITE_PROD_SERVER_URL=${VITE_PROD_SERVER_URL}
    `
  );
};

writeClientEnv();
