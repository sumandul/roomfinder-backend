// const ErroHandler = require("../../middleware/errorHandler");

  module.exports= async ({model}, res,next) => {
    try {
      const Owners = await model.user.find().select('-token')
      res.status(201).json({
        Owners
      });
    } catch (error) {
      res.status(500).json({ message: "Server error " });
    }
  };

