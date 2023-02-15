const { Article, Comment, User } = require("../models");

async function createComment(req, res) {
  const articleId = req.params.id;
  await Comment.create({
    content: req.body.commentText,
    articleId: articleId,
    userId: req.user.id,
  });
  res.redirect(`/articulos/${articleId}`);
}

module.exports = {
  createComment,
};
