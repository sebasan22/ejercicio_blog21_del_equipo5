const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.index)
router.post("/login", userController.login)

module.exports = router;
