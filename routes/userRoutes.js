const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuthenticated = require("../middlewares/isAutenticated");
const atLeastAdmin = require("../middlewares/atLeastAdmin");
router.use(isAuthenticated);

router.get("/logout", authController.logout);
router.use(atLeastAdmin);
router.get("/adminlist", authController.index);
router.get("/adminlist/eliminar/:id", authController.destroy);

module.exports = router;
