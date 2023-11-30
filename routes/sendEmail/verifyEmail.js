const User = require("../../models/user-model/registration");
const verificationToken = require("../../models/user-model/verificationToken");
const { mailTransport } = require("../../utlis/mail");
const verifyEmail = async (req, res) => {
  console.log("hello");
  const { userId, otp } = req.body;
  if (!userId || !otp.trim()) return res.send({ message: "missing parameter" });
  const user = await User.findById(userId);
  if (user.verified)
    return res.send({ message: "this account is already verified" });
  const token = await verificationToken.findOne({ owner: user._id });
  if (!token) return res.send({ message: "No user found" });
  const isMatched = await token.compareToken(otp);
  if (!isMatched) return res.send({ message: "Invalid OTP" });
  user.verified = true;
  await verificationToken.findByIdAndDelete(token._id);
  await user.save();
  mailTransport().sendMail({
    from: "dulalsuman853@gmail.com",
    to: user.email,
    subject: `Hello ${user.firstName}`,
    html: `<h1>Your Email is Verified successfully</h1>`,
  });
  res.json({ message: "your email is verified successfully" });
};

module.exports = verifyEmail;
