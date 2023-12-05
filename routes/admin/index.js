const express = require("express");
const router = express.Router();
router.patch('/update/:id', require("./room-status"));
module.exports = router;