const { Article, Comment, User } = require("../models");
const { findOne } = require("../models/User");

async function createComment(req, res) {
  const articleId = req.params.id;
  await Comment.create({
    content: req.body.commentText,
    articleId: articleId,
    userId: req.user.id,
  });
  res.redirect(`/articulos/${articleId}`);
}
async function showEdit(req, res) {
  const comment = await Comment.findByPk(req.params.id);
  res.render("edit-comment", { comment });
}
async function editComment(req, res) {
  const commentId = req.params.id;
  // await Comment findOne()
  await Comment.update(
    {
      content: req.body.text,
    },
    {
      where: {
        id: commentId,
      },
    },
  );
  res.redirect(`back`);
}
async function deleteComment(req, res) {
  const commentId = req.params.id;
  await Comment.destroy({
    where: { id: commentId },
  });
  res.redirect(`back`);
}

module.exports = {
  createComment,
  showEdit,
  editComment,
  deleteComment,
};
