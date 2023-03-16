const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const seed = async (req, res) => {
  const plainTextPassword = "87654321";
  bcrypt.hash(plainTextPassword, saltRounds, async (error, hash) => {
    const user = await User.create({
      name: "Benedict",
      userid: "benedict",
      password: hash,
    });
    res.send(user);
  });
};

const index = async (req, res) => {
  const context = {
    msg: "Welcome back, Admin! Please enter your credentials to access your account.",
  };
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
    const context = { msg: "Login Unsuccessful. Please check login details." };
    res.render("users/login", context);
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userid = user._id;
      res.redirect("/events");
    } else {
      const context = {
        msg: "Login Unsuccessful. Please check login details.",
      };
      res.render("users/login", context);
    }
  });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/users/login");
    }
  });
};

module.exports = {
  index,
  login,
  seed,
  logout,
};
