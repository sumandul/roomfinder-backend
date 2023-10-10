const HomeOwner = require("../../models/owner-model/registration");



const Show= async (req, res) => {
    try {
      const existingOwner = await HomeOwner.findById(req.params.id,)
      res.status(200).json(
        existingOwner
      );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };


  module.exports = Show;