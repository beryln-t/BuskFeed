const express = require("express");
const router = express.Router();
const buskersCtrl = require("../controllers/buskers");
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

router.get("/new", isAuth, buskersCtrl.newBusker);
router.post("/", isAuth, buskersCtrl.create);
router.get("/", buskersCtrl.index);
router.get("/manageprofiles", isAuth, buskersCtrl.profiles);
router.delete("/:id", isAuth, buskersCtrl.del);
router.get("/:id", buskersCtrl.show);
router.get("/:id/edit", isAuth, buskersCtrl.edit);
router.put("/:id", isAuth, buskersCtrl.update);

module.exports = router;
