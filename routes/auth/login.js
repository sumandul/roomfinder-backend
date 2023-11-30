const {generateToken,generateRefreshToken} = require("../../helpers/jwtSign");
const HomeOwner = require("../../models/user-model/registration")
const ErroHandler =  require("../../middleware/errorHandler")
const bcrypt = require('bcrypt')

const Login = async (req, res,next) => {
    try {
      const { email, password } = req.body;
      // Find the owner by email or contact (phone number)
      const IsExist = await HomeOwner.findOne({email});
      // Compare the provided password with the stored hashed password
    if(!IsExist){ 
      return next(new ErroHandler("Invalid Crendentails",400))
    }
    const passwordMatch = await bcrypt.compare(password, IsExist.password);
    if (!passwordMatch) {
      return next(new ErroHandler("Invalid Crendentails",400))
    }
    const access_token = generateToken(IsExist);
   const refresh_token=  generateRefreshToken(IsExist)
      res.status(200).json({
        access_token,
        refresh_token
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = Login;

  