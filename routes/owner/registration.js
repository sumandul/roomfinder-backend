const ErroHandler = require("../../middleware/errorHandler");
const User = require("../../models/user-model/registration");
const verificationToken = require("../../models/user-model/verificationToken");
const { generateOTP,mailTransport} = require("../../utlis/mail");
const  randToken =require('rand-token');

const Registration = async (req, res, next) => {
  try {
    const { email, contact } = req.body;
    // Check if an owner with the same email or phone number already exists
    const existingOwner = await User.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingOwner) {
      return next(new ErroHandler("Email or phone number already exists", 400));
    }
    // If no existing owner found, create a new instance and save to the database
    const newOwner = new User(req.body);
    const OTP = generateOTP();
    const verifedToken = new verificationToken({
      owner: newOwner._id,
      token: OTP,
    });
    await verifedToken.save();
    newOwner.token = randToken.uid(64).split("").reverse().join("");
    await newOwner.save();
    mailTransport().sendMail({
      from:"dulalsuman853@gmail.com",
      to:newOwner.email,
       subject:"Verify your email account",
       html:`<h1>${OTP}</h1>`
    })

    res.status(201).json({
      status: "ok",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error " });
  }
};


module.exports = Registration




