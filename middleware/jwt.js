const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../db/models/user");

const { JsonWebTokenError, TokenExpiredError } = jwt;
async function getToken(id) {
  try {
    const user = await User.findById(id, false, ["token"]);
    if (!user) return null;
    return user.token;
  } catch (err) {
    throw err;
  }
}

async function isValid(model, { id }) {
  try {
    const user = await model.user.findById(id);

    return !!user;
  } catch (err) {
    throw err;
  }
}

async function getTheUser(model, { id }) {
  try {
    const user = await model.user.findById(id);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      contact: user.contact,
      email: user.email,
      type: user.type,
      verified: user.verified,
    };
  } catch (err) {
    throw err;
  }
}

async function verifyToken(token, secrets) {
  const ret = { decoded: null, error: null };
  try {
    const decoded = jwt.verify(token, secrets);
    ret["decoded"] = decoded;
    console.log(ret);
    return ret;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      ret["error"] = "EXPIRED";
      return ret;
    } else if (err instanceof JsonWebTokenError) {
      ret["error"] = "INVALID";
      return ret;
    } else {
      throw err;
    }
  }
}

module.exports = (signinConfig) => async (req, res, next) => {
  const { headers, model, lib } = req;

  const ret = { decoded: null, error: null };
  try {
    if (
      !(
        headers.hasOwnProperty("authorization") &&
        headers.hasOwnProperty("refresh-token")
      )
    ) {
      return res.status(406).json({ message: "Forbidden" });
    }
    const [[_, authorizationToken], refreshToken] = [
      headers["authorization"].split(" "),
      headers["refresh-token"],
    ];
    const { id } = jwt.decode(authorizationToken);
    const hash = await getToken(id);
    if (!hash) return res.status(403).json({ message: "Forbidden" });
    const [verifiedAuthorizationToken, verifiedRefreshToken] =
      await Promise.all([
        verifyToken(
          authorizationToken,
          crypto
            .createHash("md5")
            .update(`${signinConfig.access_token.salt}${hash}`)
            .digest("hex")
        ),
        verifyToken(
          refreshToken,
          crypto
            .createHash("md5")
            .update(`${signinConfig.refresh_token.salt}${hash}`)
            .digest("hex")
        ),
      ]);
    // console.log(verifiedAuthorizationToken.error ,'acces')
    // console.log(verifiedRefreshToken.error ,'refresh')
    // if (verifiedAuthorizationToken.error === "EXPIRED" && verifiedRefreshToken.error === null) {
    //   // Access token is expired, but refresh token is valid
    //   // Use refresh token to generate a new access token
    //   const newAccessToken =  await lib.jwtSign(verifiedRefreshToken.decoded.id, signinConfig.refresh_token)

    //   // // Send the new access token in the response headers or however you handle it
    //   console.log(newAccessToken)
    //   res.setHeader('authorization', `Bearer ${newAccessToken}`);
    //   next()
    // }
    const [{ decoded: aDecoded, decoded: rDecoded }] = [
      verifiedAuthorizationToken,
      verifiedRefreshToken,
    ];
    if (verifiedAuthorizationToken.error || verifiedRefreshToken.error) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const valids = await Promise.all([
      isValid(model, aDecoded),
      isValid(model, rDecoded),
    ]);
    if (valids.filter((i) => i === true).length !== 2) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const auth = await getTheUser(model, aDecoded);
    req.auth = auth;
    next();
  } catch (err) {
    next(err);
  }
};
