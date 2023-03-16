var express = require("express");
var router = express.Router();
const usersController = require("../controllers/users");

router.get("/login", usersController.index);
router.post("/login", usersController.login);
router.get("/seed", usersController.seed);
router.get("/logout", usersController.index);

module.exports = router;
