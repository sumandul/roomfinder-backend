const jwt = require("jsonwebtoken");
const User = require("../models/user-model/registration");
const generateToken = ({ id }) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "4min" });
};

async function getToken(id) {
  console.log(id);
  try {
    const user = await User.findById(id,  false, ["token"]);
    if (!user) return null;
    return user.token;
  } catch (err) {
    throw err;
  }
}

const generateRefreshToken = ({ id }) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN, { expiresIn: "7d" }); // Refresh token lasts longer, e.g., 7 days
};
const getMyProfile = (req) => {
  const refreshToken = req.headers.refresh_token;
  const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  return id;
  // Refresh token lasts longer, e.g., 7 days
};
const Authorization = async (req, res, next) => {
  const { headers } = req;
  const ret = { decoded: null, error: null };
  try {
    // const token = req.headers.authorization;
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

    //     jwt.verify(token,process.env.SECRET_KEY , (error) => {
    //         if (error) {
    //             if (error instanceof jwt.TokenExpiredError) {
    //                 const refreshToken = req.headers.refresh_token;
    //                 if (!refreshToken) {
    //                     return res.status(401).json({ message: "token has not provide" });
    //                 }
    //                 const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    //                 const newAccessToken = generateToken({ id: decodedRefreshToken.id }, '2min');
    //                     const newRefreshToken = generateRefreshToken({ id: decodedRefreshToken.id })
    //                     // You can also send the new tokens in the response headers if needed
    //                     res.setHeader('New-Access-Token', newAccessToken);
    //                     res.setHeader('New-Refresh-Token', newRefreshToken);
    //                     next()
    // ;
    //             } else if (error instanceof jwt.JsonWebTokenError) {
    //                 ret["error"] = "INVALID TOKEN";
    //                 return res.status(401).json({ message: ret.error });
    //             }

    //         } else {
    //             next()
    //         }
    //     });

    // if (!decodedToken) {
    //     const decodedRefreshToken = jwt.verify(refreshToken, refresh_secret_key);
    //     // Generate a new access token and refresh token
    //     const newAccessToken = generateToken({ id: decodedRefreshToken.id }, '2min');
    //     const newRefreshToken = generateRefreshToken({ id: decodedRefreshToken.id })

    //     // You can also send the new tokens in the response headers if needed
    //     res.setHeader('New-Access-Token', newAccessToken);
    //     res.setHeader('New-Refresh-Token', newRefreshToken);
    // }
    // next()
  } catch (err) {
    // if (err instanceof jwt.TokenExpiredError) {
    //     ret["error"] = "EXPIRED";
    //     return res.status(401).json({ message: ret.error });
    // } else if (err instanceof jwt.JsonWebTokenError) {
    //     ret["error"] = "INVALID";
    //     return res.status(401).json({ message: ret.error });
    // } else {
    //     throw err;
    // }
  }
};

module.exports = {
  Authorization,
  getMyProfile,
  generateToken,
  generateRefreshToken,
};
