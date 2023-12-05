const ErroHandler = require("../../middleware/errorHandler");
const Post = require("../../models/user-model/post");
const UpdateStatus = async (req, res, next) => {
  try {
    const postExist = await Post.findByIdAndUpdate(req.params.id,{active:req.body.active}, { new: true });
    if (!postExist) {
      return next(new ErroHandler("Post cannot found", 400));
    }
    await postExist.save();
    res.status(200).json({
    postExist
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error " });
  }
};


module.exports = UpdateStatus




