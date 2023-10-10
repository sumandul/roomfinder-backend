const ErroHandler = require("../../middleware/errorHandler");
const HomeOwner = require("../../models/owner-model/registration");


const Registration = async (req, res,next) => {
    try {
      const { email, contact } = req.body;
      // Check if an owner with the same email or phone number already exists
      const existingOwner = await HomeOwner.findOne({
        $or: [{ email }, { contact }],
      });
  
      if (existingOwner) {
        return  next(new ErroHandler("Email or phone number already exists",400))
        
      }
      // If no existing owner found, create a new instance and save to the database
      const newOwner = new HomeOwner(req.body);
      await newOwner.save();
  
      res.status(201).json({
       status:"ok"
      });
    } catch (error) {
      res.status(500).json({ message: "Server error " });
    }
  };


  module.exports =Registration;