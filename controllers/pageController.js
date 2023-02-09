const { Article } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll();
  console.log(articles);
  res.render("home", { articles });
}

async function showArticulos(req, res) {
  res.render("articulos");
}

async function showAdmin(req, res) {
  res.render("admin");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showArticulos,
  showAdmin,
};
