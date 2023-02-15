const passport = require("passport");
const { Article, Comment, User } = require("../models");
const bcrypt = require("bcryptjs");
// Display a listing of the resource.

async function index(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

async function register(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register");
  }
}

async function storeUser(req, res) {
  await User.create({
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 8),
  });
  return res.redirect("/");
}

module.exports = {
  index,
  login,
  register,
  storeUser,
};
