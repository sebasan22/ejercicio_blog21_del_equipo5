const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAutenticated");
const adminAutenticate = require("../middlewares/adminAutenticated");

router.get("/admin", isAuthenticated, adminAutenticate, pageController.showAdmin);
router.get("/admin/eliminar/:id", adminAutenticate, articleController.destroy);
router.get("/admin/new", adminAutenticate, articleController.create);
router.get("/admin/edit/:id", adminAutenticate, articleController.edit);
router.post("/admin/edit/:id", adminAutenticate, articleController.update);

module.exports = router;
