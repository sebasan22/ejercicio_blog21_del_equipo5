const { Article } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll();
  console.log(articles);
  res.json(articles);
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id);
  const author = await article.getAuthor();
  res.render("articulos", { article, author });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("new");
}

// Store a newly created resource in storage.
async function store(req, res) {
  await Article.create({
    title: req.body.titulo,
    content: req.body.text,
    img: req.body.img,
    userId: Math.floor(Math.random() * 14) + 1,
  });
  res.redirect("/panel/admin");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  console.log(req.body.article);
  res.render("edit", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  res.redirect("/panel/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;

  await Article.destroy({
    where: {
      id: articleId,
    },
  });
  res.redirect("/panel/admin");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
