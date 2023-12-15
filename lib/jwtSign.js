const User = require("../db/models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { appName } = require("../config");
  module.exports = async (id, tokenConfig) => {
    console.log(id)
    try {
      const getUser = await User.findById({_id:id}, false, [
        "token",
      ]);
  
      if (!getUser) return null;
      return  jwt.sign(
        { id: getUser.id },
        crypto
          .createHash("md5")
          .update(`${tokenConfig.salt}${getUser.token}`)
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

  