const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const isAuthenticated = require("../middlewares/isAutenticated");
const atLeastEditor = require("../middlewares/atLeastEditor");

router.use(isAuthenticated);

router.post("/:id", commentController.createComment);
router.get("/editar/:id", atLeastEditor, commentController.showEdit);
router.post("/editar/:id", atLeastEditor, commentController.editComment);
router.get("/eliminar/:id", atLeastEditor, commentController.deleteComment);

module.exports = router;
