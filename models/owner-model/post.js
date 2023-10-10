const mongoose = require("mongoose");

const roomPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String], // An array of strings (image URLs or paths)
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const RoomPost = mongoose.model("RoomPost", roomPostSchema);

module.exports = RoomPost;
