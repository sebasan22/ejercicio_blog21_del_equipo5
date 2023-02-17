const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/:id", commentController.createComment);
router.get("/editar/:id", commentController.showEdit);
router.post("/editar/:id", commentController.createComment);
router.get("/eliminar/:id", commentController.deleteComment);

module.exports = router;
