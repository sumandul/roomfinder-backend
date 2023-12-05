const jwt = require('jsonwebtoken');
const generateToken = ({ id }) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn:"4min" });
};

const generateRefreshToken = ({ id }) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN, { expiresIn: '7d' }); // Refresh token lasts longer, e.g., 7 days
};
const getMyProfile = (req) => {
    const refreshToken = req.headers.refresh_token;4
    const {id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    return id
   // Refresh token lasts longer, e.g., 7 days
};
const Authorization = (req, res, next) => {
    const ret = { decoded: null, error: null };
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token,process.env.SECRET_KEY , (error) => {
            if (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    const refreshToken = req.headers.refresh_token;
                    if (!refreshToken) {
                        return res.status(401).json({ message: "token has not provide" });
                    }
                    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
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
    getMyProfile,
    generateToken,
    generateRefreshToken
};
