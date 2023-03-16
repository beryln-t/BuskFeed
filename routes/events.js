const express = require("express");
const router = express.Router();
const eventsCtrl = require("../controllers/events");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  if (req.session.userid) {
    const user = await User.findById(req.session.userid).exec();
    res.locals.user = user;
    next();
  } else {
    const context = {
      msg: "Please Login to access page.",
    };
    res.render("users/login", context);
  }
};

router.get("/new", isAuth, eventsCtrl.newEvent);
router.post("/", isAuth, eventsCtrl.create);
router.get("/", eventsCtrl.index);
router.get("/manageevents", isAuth, eventsCtrl.manage);
router.delete("/:id", isAuth, eventsCtrl.del);
router.get("/:id", eventsCtrl.show);
router.get("/:id/edit", isAuth, eventsCtrl.edit);
router.put("/:id", isAuth, eventsCtrl.update);

module.exports = router;
