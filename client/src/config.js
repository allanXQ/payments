const ENV = import.meta.env.VITE_ENV;
const DEV_SERVER_URL = import.meta.env.VITE_DEV_SERVER_URL;
const PROD_SERVER_URL = import.meta.env.VITE_PROD_SERVER_URL;

const config = {
  server_url: ENV === "dev" ? DEV_SERVER_URL : PROD_SERVER_URL,
};

export default config;
