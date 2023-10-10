const RoomPost = require("../../../models/owner-model/post");
const Show= async (req, res) => {
    // console.log(req.params)
    try {
      const SingleRoom = await RoomPost.findById(req.params.id)
      res.status(200).json(
        SingleRoom
      );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };


  module.exports = Show;