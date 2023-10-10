const ErroHandler = require("../../../middleware/errorHandler");
const RoomPost = require("../../../models/owner-model/post");
const ImgaeUploadService = require("../../..")

const RoomAdd = async (req, res, next) => {

  
  try {
    // If no existing owner found, create a new instance and save to the database
    const newPost = new RoomPost(req.body);
    await newPost.save();

    res.status(201).json({
      status: "ok",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};

module.exports = RoomAdd;
