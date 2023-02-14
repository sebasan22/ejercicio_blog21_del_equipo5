const { Article, Comment, User } = require("../models");

async function createComment(req, res) {
  const articleId = req.params.id;
  await Comment.create({
    content: req.body.commentText,
    articleId: articleId,
    userId: Math.floor(Math.random() * 14) + 1,
  });
  res.redirect(`/articulos/${articleId}`);
}

module.exports = {
  createComment,
};
