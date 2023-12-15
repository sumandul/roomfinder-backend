const ErroHandler = require("../../../middleware/errorHandler");

 module.exports = async ({body,model}, res, next) => {
  console.log("hello")

  
  try {
    // If no existing owner found, create a new instance and save to the database
    const newPost = new model.post(body);
    await newPost.save();

    res.status(201).json({
      status: "ok",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};
