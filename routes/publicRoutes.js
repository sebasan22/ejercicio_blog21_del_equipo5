const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const authController = require("../controllers/authController");
const isAuthenticated = require("../middlewares/isAutenticated");

/* const articleRoutes = require("./articleRoutes"); */

router.post("/login", authController.login);
router.get("/login", isAuthenticated, authController.waitingLogin);
router.get("/logout", authController.logout);
router.get("/register", authController.register);
router.post("/register", authController.storeUser);
router.get("/", pageController.showHome);

module.exports = router;
