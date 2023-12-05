const {Authorization} = require("../../helpers/jwtSign")

const router = require("express").Router();
router.get("/myProfile",Authorization, require("./myProfile"));
router.get("/room",Authorization, require("./room/rooml-list"));
router.get("/list",Authorization, require("./list"));
router.get("/:id", Authorization, require("./show"));
router.post("/registration", require("./registration"));
router.post("/add-location", require("./addLocation"));
router.post("/room-add",Authorization, require("./room/room-add"));
router.get("/room/:id",Authorization, require("./room/show"));
router.put("/room-update/:id",Authorization, require("./room/update"));


module.exports = router;