const { Article, User } = require("../models");
const format = require("date-fns/format");
const es = require("date-fns/locale/es");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User }, { order: [["createdAt", "DESC"]] });
  res.render("home", { articles, format, es });
}

async function showArticulos(req, res) {
  const article = await Article.findByPk(req.params.id);
  const author = await article.getAuthor();
  res.render("articulos", { article, author });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll({ include: User });
  res.render("admin", { articles, format, es });
}

module.exports = {
  showHome,
  showArticulos,
  showAdmin,
};
