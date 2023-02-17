const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAutenticated");
const atLeastWriter = require("../middlewares/atLeastWriter");

router.use(isAuthenticated);

router.get("/admin", atLeastWriter, pageController.showAdmin);
router.get("/admin/eliminar/:id", atLeastWriter, articleController.destroy);
router.get("/admin/new", atLeastWriter, articleController.create);
router.get("/admin/edit/:id", atLeastWriter, articleController.edit);
router.post("/admin/edit/:id", atLeastWriter, articleController.update);

module.exports = router;
