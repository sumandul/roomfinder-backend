
const express = require("express");
const util = require("util");
const database = require('./databse/db');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser")
require('dotenv').config();
const cors = require('cors')
const router = require("./routes");
const uploadImage = require("./routes/upload");
const errorMiddleware = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors())
app.use(
  fileUpload({
    useTempFiles:true
  })
);
app.use("/",router);
// app.use(bodyParser.json())
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use(errorMiddleware);

