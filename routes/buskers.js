const express = require("express");
const router = express.Router();
const buskersCtrl = require("../controllers/buskers");

router.get("/new", buskersCtrl.newBusker);
router.post("/", buskersCtrl.create);
router.get("/", buskersCtrl.index);
router.get("/profiles", buskersCtrl.myProfile);
router.delete("/:id", buskersCtrl.del);
router.get("/:id", buskersCtrl.show);
router.delete("/:id", buskersCtrl.del);
router.get("/:id/edit", buskersCtrl.edit);
router.put("/:id", buskersCtrl.update);

module.exports = router;
