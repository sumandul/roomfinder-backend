const express = require("express");
const router = express.Router();
router.post('/verify-email', require("./verifyEmail"));
module.exports = router;