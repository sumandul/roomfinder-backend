const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  tole: {
    type: String,
    required: true,
  },
  houseNo: {
    type: Number,
    required: true,
  }
});
const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
