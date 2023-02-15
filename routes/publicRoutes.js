const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const authController = require("../controllers/authController");

/* const articleRoutes = require("./articleRoutes"); */

router.post("/login", authController.login);
router.get("/login", authController.index);
router.get("/register", authController.register);
router.post("/register", authController.storeUser);
router.get("/", pageController.showHome);

module.exports = router;
