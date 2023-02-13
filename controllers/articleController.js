const { Article, Comment, User } = require("../models");

async function createComment(req, res) {
  const articleId = req.params.id;
  const commentText = req.body.commentText;
  await Comment.create({
    content: commentText,
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
  console.log(req.params);
  res.render("edit", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const articleId = req.params.id;
  const titulo = req.body.titulo;
  const img = req.body.img;
  const content = req.body.text;

  await Article.update(
    {
      title: titulo,
      content: content,
      img: img,
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
