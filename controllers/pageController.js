const { Article, User } = require("../models");
const format = require("date-fns/format");
const es = require("date-fns/locale/es");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User, order: [["updatedAt", "DESC"]] });
  res.render("home", { articles, format, es });
}

async function showAdmin(req, res) {
  if (req.isAuthenticated()) {
    const articles = await Article.findAll({ include: User, order: [["updatedAt", "DESC"]] });
    res.render("admin", { articles, format, es });
  } else {
    res.render("login")
  }
}


module.exports = {
  showHome,
  showAdmin,
};
