


 module.exports= async ({model,params}, res) => {
    try {
      const existingOwner = await model.user.findById(params.id)
      res.status(200).json(
        existingOwner
      );
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
