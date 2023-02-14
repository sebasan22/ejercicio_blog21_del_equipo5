const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const userController = require("../controllers/userController");
//const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
//const commentRoutes = require("./commentRoutes");

router.post("/login", userController.index)

router.get("/", pageController.showHome);
router.get("/login", pageController.showLogin);

module.exports = router;
