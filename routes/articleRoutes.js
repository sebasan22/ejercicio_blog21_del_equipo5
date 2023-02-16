const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAutenticated");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", isAuthenticated, articleController.create);
router.post("/", isAuthenticated, articleController.store);
router.get("/:id", articleController.show);
router.get("/:id/editar", isAuthenticated, articleController.edit);
router.post("/:id", isAuthenticated, articleController.update);
router.get("/eliminar/:id", isAuthenticated, articleController.destroy);

module.exports = router;
