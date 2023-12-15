const ErroHandler = require("../../middleware/errorHandler");
const UpdateStatus = async ({body,model,params}, res, next) => {
  try {
    const postExist = await model.post.findByIdAndUpdate(params.id,{active:body.active}, { new: true });
    if (!postExist) {
      return next(new ErroHandler("Post cannot found", 400));
    }
    await postExist.save();
    res.status(200).json({
    postExist
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};


module.exports = UpdateStatus




