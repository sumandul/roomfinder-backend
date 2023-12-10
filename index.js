
const express = require("express");
require('dotenv').config();
const util = require("util");
const database = require('./lib/db');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser")
const guard = require("./middleware/guard")
const { debug, port, token } = require("./config");

const cors = require('cors')
const router = require("./routes");
const uploadImage = require("./routes/upload");
const errorMiddleware = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors())
app.use(guard(process.env.API_KEY));
app.use((req, res, next) => {
  req.config = require("./config");
  req.libs = require("./libs");

  next();
});

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

