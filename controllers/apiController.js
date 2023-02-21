const { Article, Comment, User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const token = jwt.sign({ sub: "user123" }, "UnStringMuySecreto");

async function index(req, res) {
  if (req.query.userId) {
    const articleByUser = await Article.findAll({
      where: {
        userId: req.query.userId,
      },
    });
    return res.json(articleByUser);
  } else if (req.query.title) {
    const articleByTitle = await Article.findAll({
      where: {
        title: { [Op.substring]: req.query.title },
      },
    });

    return res.json(articleByTitle);
  }
  const articles = await Article.findAll();
  return res.json(articles);
}

async function create(req, res) {
  const newArticle = await Article.create({
    title: req.query.title,
    content: req.query.content,
    img: req.query.img,
    userId: req.query.userId,
  });
  return res.json(newArticle);
}

async function edit(req, res) {
  let articleId = req.query.id;
  const editArticle = await Article.update(
    {
      title: req.query.title,
      content: req.query.content,
      img: req.query.img,
      userId: req.query.userId,
    },
    { where: { id: articleId } },
  );
  return res.json(editArticle);
}
async function destroy(res, req) {
  let articleId = req.query.id;
  const deleteArticle = await Article.destroy({
    where: {
      id: articleId,
    },
  });
  return res.json(deleteArticle);
}

async function tokens(req, res) {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const match = await user.isValidPassword(req.body.password);
    if (match) {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
      return res.json({ token: token });
    }
  }
  res.send("hola");
}

module.exports = { index, create, edit, destroy, tokens };
