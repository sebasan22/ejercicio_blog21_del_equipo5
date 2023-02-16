const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAutenticated");
const adminAutenticate = require("../middlewares/adminAutenticated");
const writerAutenticate = require("../middlewares/writerAutenticated");

router.get("/admin", isAuthenticated, adminAutenticate, pageController.showAdmin);
router.get("/admin/eliminar/:id", isAuthenticated, adminAutenticate, articleController.destroy);
router.get("/admin/new", isAuthenticated, adminAutenticate, articleController.create);
router.get("/admin/edit/:id", isAuthenticated, adminAutenticate, articleController.edit);
router.post("/admin/edit/:id", isAuthenticated, adminAutenticate, articleController.update);

module.exports = router;
