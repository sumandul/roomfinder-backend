const ErroHandler = require("../../middleware/errorHandler");
 module.exports = async (req, res, next) => {
  const {model,auth} = req
  try {
    const currentUser =  await model.user.findById(auth.id).select('-token')
    res.status(200).json({ profile:  currentUser });
  } catch (error) {4
    res.status(500).json({ message: "Server error " });
  }
};






