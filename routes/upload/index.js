const express = require("express");
const  upload = require("../../middlerware/multer")
const router = express.Router();
router.post('/', require("./uploadImage"));
module.exports = router;