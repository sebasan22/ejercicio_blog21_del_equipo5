const { Article, User } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User });
  res.render("home", { articles });
}

async function showArticulos(req, res) {
  const article = await Article.findByPk(req.params.id);
  const author = await article.getAuthor();
  res.render("articulos", { article, author });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll({ include: User });
  res.render("admin", { articles });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showArticulos,
  showAdmin,
};
