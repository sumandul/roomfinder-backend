// const ErroHandler = require("../../middleware/errorHandler");
const HomeOwner = require("../../models/user-model/registration");

const List = async (req, res,next) => {
    try {
      const Owners = await HomeOwner.find()
      res.status(201).json({
        Owners
      });
    } catch (error) {
      res.status(500).json({ message: "Server error " });
    }
  };


  module.exports =List;