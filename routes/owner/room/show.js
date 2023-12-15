  module.exports = async ({model,params}, res) => {
    try {
      const SingleRoom = await model.post.findById(params.id)
      res.status(200).json(
        SingleRoom
      );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

