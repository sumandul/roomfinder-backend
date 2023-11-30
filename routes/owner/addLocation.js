const ErroHandler = require("../../middleware/errorHandler");
const Location = require("../../models/user-model/location");
const AddLocation = async (req, res, next) => {
  try {
    const { houseNo } = req.body;
    const existingHouseNo = await Location.findOne({houseNo});
    if (existingHouseNo) {
      return next(new ErroHandler("House Number Already register in our system", 400));
    }
    
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json({
      newLocation
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error " });
  }
};


module.exports = AddLocation




