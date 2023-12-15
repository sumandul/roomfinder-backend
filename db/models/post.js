const mongoose = require("mongoose");

const roomPostSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  active: {
    type: Boolean,
    default: false,
  },
  images: {
    type: [String], // An array of strings (image URLs or paths)
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now()
}
});

const RoomPost = mongoose.model("RoomPost", roomPostSchema);

module.exports = RoomPost;