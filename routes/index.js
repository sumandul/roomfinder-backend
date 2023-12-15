const router = require("express").Router();
const { jwt } = require("../middleware");
const { signinConfig } = require("../config");
const { config } = require("dotenv");
router.use("/auth", require("./auth"));
router.use("/registration", require("./owner/registration"));
router.use("/owner", jwt(signinConfig), require("./owner"));
router.use("/upload", require("./upload"));
router.use("/admin", require("./admin"));
router.use("/user", require("./sendEmail"));
// router.use("/", , require("./authenticated"));

module.exports = router;
