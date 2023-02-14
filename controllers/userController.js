
const { User } = require("../models");
const bcrypt = require("bcryptjs")
const passport = require("passport")

// Display a listing of the resource.
async function index(req, res) {
  res.redirect("/")
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
});


module.exports = {
  index,
  login
};
