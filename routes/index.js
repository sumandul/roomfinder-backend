const router = require("express").Router();
// const { jwt } = require("../middlewares");
// const { signinConfig } = require("../config");
router.use("/auth", require("./auth"));
router.use("/owner", require("./owner"));
router.use("/upload", require("./upload"));
router.use("/admin", require("./admin"));
router.use("/user", require("./sendEmail"));
// router.use("/", jwt(signinConfig), require("./authenticated"));

module.exports = router;
