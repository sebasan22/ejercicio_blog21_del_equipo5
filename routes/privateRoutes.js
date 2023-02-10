const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/admin", pageController.showAdmin);

module.exports = router;
