
const { mailTransport } = require("../../utlis/mail");
const verifyEmail = async ({body,model}, res) => {

  const { userId, otp } = body;
  if (!userId || !otp.trim()) return res.send({ message: "missing parameter" });
  const user = await model.user.findById(userId);
  if (user.verified)
    return res.send({ message: "this account is already verified" });
  const token = await model.verification_token.findOne({ owner: user._id });
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
