const ErroHandler = require("../../middleware/errorHandler");
const User = require("../../models/user-model/registration");
const {getMyProfile} = require("../../helpers/jwtSign");
const myProfile = async (req, res, next) => {
  try {
     const id =  getMyProfile(req)
    const currentUser =  await User.findById(id).select('-password')
    res.status(200).json({ profile:  currentUser });
  } catch (error) {4
    res.status(500).json({ message: "Server error " });
  }
};

module.exports = myProfile;




