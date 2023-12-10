require('dotenv').config();

module.exports = {
    appName: process.env.APP_NAME,
    debug: process.env.DEBUG === "true",
    port: parseInt(process.env.PORT),
    signinConfig:'',
    token: process.env.API_KEY
  };