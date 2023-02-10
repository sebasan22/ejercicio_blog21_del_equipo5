const { Article, User } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll();
  res.render("home", { articles });
}

async function showArticulos(req, res) {
  const article = await Article.findByPk(req.params.id, { include: User });
  console.log(article.user.dataValues);
  res.render("articulos", { article, author: article.user.dataValues });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll();
  res.render("admin", { articles });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showArticulos,
  showAdmin,
};
