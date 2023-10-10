const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://suman:suman123@cluster0.2kp29.mongodb.net/roomfinder";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(" db successfully");
});