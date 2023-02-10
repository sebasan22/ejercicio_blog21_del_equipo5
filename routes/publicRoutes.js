const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/", pageController.showHome);
router.get("/articulos/:id", pageController.showArticulos);

module.exports = router;
