const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.get("/articulos/:id", (req, res) => {
  res.render("articulos");
});

module.exports = router;
