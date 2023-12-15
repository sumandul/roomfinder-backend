const {Authorization} = require("../../lib/jwtSign")

const router = require("express").Router();
router.get("/myProfile", require("./myProfile"));
router.get("/room", require("./room/rooml-list"));
router.get("/list", require("./list"));
router.get("/:id", require("./show"));
router.post("/add-location", require("./addLocation"));
router.post("/room-add", require("./room/room-add"));
router.get("/room/:id", require("./room/show"));
router.put("/room-update/:id",require("./room/update"));


module.exports = router;