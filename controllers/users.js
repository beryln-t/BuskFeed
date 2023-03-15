const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const seed = async (req, res) => {
  const plainTextPassword = "123";
  bcrypt.hash(plainTextPassword, saltRounds, async (err, hash) => {
    const user = await User.create({ userid: "simon", password: hash });
    res.send(user);
  });
};

const index = async (req, res) => {
  const context = { msg: "1st message" };
  res.render("users/login", context);
};

//* /users/login POST
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const login = async (req, res) => {
  const { userid, password } = req.body;

  const user = await User.findOne({ userid }).exec();
  if (user === null) {
    const context = { msg: "No user" };
    res.render("users/login", context);
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userid = user._id;
      res.redirect("/movies");
    } else {
      const context = { msg: "password wrong" };
      res.render("users/login", context);
    }
  });
};

const secret = (req, res) => {
  res.send("secret");
  // if (req.session.userid) {
  //   res.send(req.session.userid);
  // } else {
  //   res.send("Sorry");
  // }
};

module.exports = {
  index,
  login,
  seed,
  secret,
};
