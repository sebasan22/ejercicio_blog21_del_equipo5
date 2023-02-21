const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get(
  "/articulos",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.index,
);
router.post("/articulos/crear", apiController.create);
router.patch("/articulos/editar", apiController.edit);
router.delete("/articulos/eliminar", apiController.destroy);
router.post("/tokens", apiController.tokens);

module.exports = router;
