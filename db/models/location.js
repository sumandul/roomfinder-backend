const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomPost",
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
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