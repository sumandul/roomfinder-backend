const ErroHandler = require("../../middleware/errorHandler");
 module.exports = async ({body,model}, res, next) => {
  try {
    const existingHouseNo = await model.location.findOne({houseNo:body.houseNo});
    if (existingHouseNo) {
      return next(new ErroHandler("House Number Already register in our system", 400));
    }
    
    const newLocation = new model.location(body);
    await newLocation.save();
    res.status(201).json({
      newLocation
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error " });
  }
};






