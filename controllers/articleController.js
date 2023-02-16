const { Article, Comment, User } = require("../models");
const format = require("date-fns/format");
const es = require("date-fns/locale/es");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll();
  return res.json(articles);
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
    order: [[{ model: Comment }, "updatedAt", "DESC"]],
  });
  return res.render("articulos", { article, es, format });
}

// Show the form for creating a new resource
async function create(req, res) {
  return res.render("new");
}

// Store a newly created resource in storage.
async function store(req, res) {
  await Article.create({
    title: req.body.titulo,
    content: req.body.text,
    img: req.body.img,
    userId: req.user.dataValues.id,
  });
  return res.redirect("/panel/admin");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: {
      model: User,
    },
  });

  if (
    req.user.dataValues.id === article.user.id ||
    req.user.roleId === 4 ||
    req.user.roleId === 3
  ) {
    return res.render("edit", { article });
  } else {
    console.log("No tenes permiso.");
    return res.redirect("/panel/admin");
  }
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
  return res.redirect("/panel/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const articleId = req.params.id;
  const article = await Article.findByPk(req.params.id, {
    include: {
      model: User,
    },
  });

  if (req.user.dataValues.id === article.user.id || req.user.roleId === 4) {
    await Article.destroy({
      where: {
        id: articleId,
      },
    });
    return res.redirect("/panel/admin");
  } else {
    console.log("No tines permisos para eliminar");
    return res.redirect("/panel/admin");
  }
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
