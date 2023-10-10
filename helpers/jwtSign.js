const jwt = require('jsonwebtoken');
const secret_key = "suman dulal";
const refresh_secret_key = "refresh_secret_key"; // You should use a different secret key for refresh tokens

const generateToken = ({ id }) => {
    return jwt.sign({ id }, secret_key, { expiresIn:"4min" });
};

const generateRefreshToken = ({ id }) => {
    return jwt.sign({ id }, refresh_secret_key, { expiresIn: '7d' }); // Refresh token lasts longer, e.g., 7 days
};
const Authorization = (req, res, next) => {
    const ret = { decoded: null, error: null };
    try {
        const token = req.headers.authorization;
  
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, secret_key, (error) => {
            if (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    const refreshToken = req.headers.refresh_token;
                    if (!refreshToken) {
                        return res.status(401).json({ message: "token has not provide" });
                    }
                    const decodedRefreshToken = jwt.verify(refreshToken, refresh_secret_key);
                    const newAccessToken = generateToken({ id: decodedRefreshToken.id }, '2min');
                        const newRefreshToken = generateRefreshToken({ id: decodedRefreshToken.id })
                        // You can also send the new tokens in the response headers if needed
                        res.setHeader('New-Access-Token', newAccessToken);
                        res.setHeader('New-Refresh-Token', newRefreshToken);
                        next()
    ;
                } else if (error instanceof jwt.JsonWebTokenError) {
                    ret["error"] = "INVALID TOKEN";
                    return res.status(401).json({ message: ret.error });
                }

            } else {
                next()
            }
        });
       
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
        console.log(err)
        if (err instanceof jwt.TokenExpiredError) {
    
            ret["error"] = "EXPIRED";
            return res.status(401).json({ message: ret.error });
        } else if (err instanceof jwt.JsonWebTokenError) {
            ret["error"] = "INVALID";
            return res.status(401).json({ message: ret.error });
        } else {
            throw err;
        }
    }
};

module.exports = {
    Authorization,
    generateToken,
    generateRefreshToken
};
