const mongoose = require('mongoose');
const { db_url } = require("../config");
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(" db successfully");
});