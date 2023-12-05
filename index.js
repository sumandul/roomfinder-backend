
const express = require("express");
require('dotenv').config();
const util = require("util");
const database = require('./lib/db');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser")

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
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use(errorMiddleware);

