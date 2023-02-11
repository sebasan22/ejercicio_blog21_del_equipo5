const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const articleController = require("../controllers/articleController");

router.get("/admin", pageController.showAdmin);
router.get("/admin/eliminar/:id", articleController.destroy);
router.get("/admin/new", articleController.create);
router.get("/admin/edit/:id", articleController.edit);
module.exports = router;
