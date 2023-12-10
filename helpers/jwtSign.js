const User = require("../models/user-model/registration");

 const GenerateToken = async (id, tokenConfig) => {
    try {
      const user = await User.findById({ id}, false, [
        "token",
      ]);
  
      if (!user) return null;
  
      return await jwt.sign(
        { id: user.id },
        crypto
          .createHash("md5")
          .update(`${tokenConfig.salt}${user.token}`)
          .digest("hex"),
        {
          issuer: appName,
          expiresIn: tokenConfig.expiresIn,
        }
      );
    } catch (err) {
      throw err;
    }
  };

  