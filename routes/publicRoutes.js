const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
//const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
//const commentRoutes = require("./commentRoutes");

router.get("/", pageController.showHome);
router.get("/login", pageController.showLogin);

module.exports = router;
