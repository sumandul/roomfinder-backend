
 module.exports = async ({ params, body ,model}, res, next) => {
  try {
    const updatedPost = await model.findByIdAndUpdate(
      { _id: params.id },
      body, // This should be the update object
      {
        new: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      status: "ok",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

