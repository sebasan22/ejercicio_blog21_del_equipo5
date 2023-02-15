const passport = require("passport");
const { Article, Comment, User } = require("../models");
const bcrypt = require("bcryptjs");
// Display a listing of the resource.

async function index(req, res) {
  res.redirect("/");
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

function logout(req, res) {
  req.logout((err) => {
    if (err) throw err
    return res.redirect("/login")
  });
}

async function register(req, res) {
  res.render("register");
}

async function storeUser(req, res) {

  if (req.body.password === req.body.confirmpassword) {
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 8),
    });
    return res.redirect("/");

  } else {
    console.log("las contraseñas no coinciden");
    return res.redirect("/register");
  }
}

module.exports = {
  index,
  login,
  logout,
  register,
  storeUser,
};
