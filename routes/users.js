var express = require("express");
var router = express.Router();
const usersController = require("../controllers/users");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
  } else {
    res.status(403).send("SORRY");
  }
};

router.get("/login", usersController.index);
router.post("/login", usersController.login);
router.get("/seed", isAuth, usersController.seed);
router.get("/secret", isAuth, usersController.secret);

module.exports = router;
