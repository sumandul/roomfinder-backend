
const router = require("express").Router();
router.post("/",  require("./login"));
// router.post("/refresh", require("./refresh"));

module.exports = router;