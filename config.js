require("dotenv").config();

module.exports = {
  appName: process.env.APP_NAME,
  debug: process.env.DEBUG === "true",
  port: parseInt(process.env.PORT),
  db_url: process.env.MOONGODB_URL,
  signinConfig:JSON.parse(process.env.SIGNIN_CONFIG),
  token: process.env.API_KEY,
};
