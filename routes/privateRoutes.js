const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAutenticated");

router.get("/admin", isAuthenticated, pageController.showAdmin);
router.get("/admin/eliminar/:id", articleController.destroy);
router.get("/admin/new", articleController.create);
router.get("/admin/edit/:id", articleController.edit);
router.post("/admin/edit/:id", articleController.update);

module.exports = router;
