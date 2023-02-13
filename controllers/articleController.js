const { Article, Comment, User } = require("../models");
const format = require("date-fns/format");
const es = require("date-fns/locale/es");

async function createComment(req, res) {
  const articleId = req.params.id;
  await Comment.create({
    content: req.body.commentText,
    articleId: articleId,
    userId: Math.floor(Math.random() * 14) + 1,
  });
  res.redirect(`/articulos/${articleId}`);
}

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll();
  res.json(articles);
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        include: {
          model: User,
        },
      },
    ],
  });
  const author = await article.getAuthor();

  res.render("articulos", { article, author, es, format });
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
  res.render("edit", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const articleId = req.params.id;
  await Article.update(
    {
      title: req.body.titulo,
      content: req.body.text,
      img: req.body.img,
    },
    {
      where: {
        id: articleId,
      },
    },
  );
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
  createComment,
};
