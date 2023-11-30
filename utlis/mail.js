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
exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!user || !otp.trim()) return res.send({ message: "INVALID" });
  if (!isValidObjectId(userId))
    return res.send({ message: "sorry user not found" });
  const user = await User.findById(userId);
  if (user.verified)
    return res.send({ message: "this account is already verified" });
};
