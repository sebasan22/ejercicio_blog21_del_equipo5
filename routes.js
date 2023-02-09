const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.get("/article/:id", (req, res) => {
  res.render(article);
});

module.exports = router;
