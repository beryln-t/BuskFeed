const express = require("express");
const router = express.Router();
const eventsCtrl = require("../controllers/events");

router.get("/new", eventsCtrl.newEvent);
router.post("/", eventsCtrl.create);
router.get("/", eventsCtrl.index);
router.get("/myevents", eventsCtrl.myEvents);
router.delete("/:id", eventsCtrl.del);
router.get("/:id", eventsCtrl.show);
router.get("/:id", eventsCtrl.edit);
router.put("/:id", eventsCtrl.update);

module.exports = router;
