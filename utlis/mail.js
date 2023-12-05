const { isValidObjectId } = require("mongoose");
const User = require("../models/user-model/registration");
const nodemailer = require("nodemailer");
exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const roundedOtp = Math.round(Math.random() * 9);
    otp = otp + roundedOtp;
  }
  return otp;
};
exports.mailTransport = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

