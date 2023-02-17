const passport = require("passport");
const { Article, Comment, User } = require("../models");
const bcrypt = require("bcryptjs");

async function waitingLogin(req, res) {
  res.redirect("/");
}

async function index(req, res) {
  const users = await User.findAll();
  if (req.user.roleCode >= 400) {
    res.render("user-adminlist", { users });
  }
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

function logout(req, res) {
  req.logout((err) => {
    if (err) throw err;
    return res.redirect("/login");
  });
}

async function register(req, res) {
  res.render("register");
}

async function storeUser(req, res) {
  const accessName = ["lector", "escritor", "editor", "administrador"];
  const roleCode = [100, 200, 300, 400];
  let randomNumber = Math.floor(Math.random() * 4);

  if (req.body.password === req.body.confirmpassword) {
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 8),
      roleName: accessName[randomNumber],
      roleCode: roleCode[randomNumber],
    });
    return res.redirect("/");
  } else {
    console.log("las contraseñas no coinciden");
    return res.redirect("/register");
  }
}

async function destroy(req, res) {
  const userId = req.params.id;
  const users = await User.findByPk(req.params.id);

  if (req.user.roleCode >= 400) {
    await User.destroy({
      where: {
        id: userId,
      },
    });
    return res.redirect("/usuarios/adminlist");
  } else {
    console.log("No tines permisos para eliminar");
    return res.redirect("/");
  }
}

module.exports = {
  index,
  login,
  logout,
  register,
  storeUser,
  waitingLogin,
  destroy,
};
