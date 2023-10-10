const jwt = require('jsonwebtoken');
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const secret_key = "suman dulal"; // Replace with your actual secret key

const Authorization = (req, res, next) => {
    const ret = { decoded: null, error: null };
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }


    const decodedToken = jwt.verify(token, secret_key);
    
    next()

    // if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
    //   return res.status(401).json({ message: 'Token has expired' });
    // }

    // req.userId = decodedToken.userId;
    // next(); // Proceed to the next middleware
  } catch (err) {
    if (err instanceof TokenExpiredError) {
        ret["error"] = "EXPIRED";
      return res.status(401).json({ message: ret.error });
      } else if (err instanceof JsonWebTokenError) {
        ret["error"] = "INVALID";
         return res.status(401).json({ message: ret.error });
      } else {
        throw err;
      };
  }
};

module.exports = Authorization;
