const express = require("express");
const router = express.Router();
const buskersCtrl = require("../controllers/buskers");

router.get("/", buskersCtrl.index);

module.exports = router;
