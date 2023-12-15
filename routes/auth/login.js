const ErroHandler = require("../../middleware/errorHandler");
const bcrypt = require("bcrypt");

module.exports = async ({ body, model, config, lib }, res, next) => {
  try {
    const [{ email, password }, { signinConfig }, { jwtSign }] = [
      body,
      config,
      lib,
    ];
    // Find the owner by email or contact (phone number)
    const IsExistUser = await model.user.findOne({ email });
    // Compare the provided password with the stored hashed password
    if (!IsExistUser) {
      return next(new ErroHandler("Invalid Crendentails", 400));
    }
    const passwordMatch = await bcrypt.compare(password, IsExistUser.password);
    if (!passwordMatch) {
      return next(new ErroHandler("Invalid Crendentails", 400));
    }
  
    const [authorizationToken, refreshToken] = await Promise.all([
      jwtSign(IsExistUser.id, signinConfig.access_token),
      jwtSign(IsExistUser.id, signinConfig.refresh_token),
    ])
    res.status(200).json({
      authorizationToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
