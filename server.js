///// Requires
require("dotenv").config();
const express = require("express");
const router = require("./routes");
const port = process.env.APP_PORT || 3000;
const app = express();
const passportConfig = require("./passport/passportConfig");
const dbInitialSetup = require("./dbInitialSetup");
const jwt = require("jsonwebtoken");
const { expressjwt: checkJwt } = require("express-jwt");
var cors = require("cors");

const token = jwt.sign({ sub: "user123" }, "UnStringMuySecreto");

app.use(cors());

///// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

///// Motor de vistas
app.set("view engine", "ejs");

///// Passport
passportConfig(app);

////// Rutas
router(app);

////// DB
dbInitialSetup();

////// Run Server
app.listen(port, () => {
  console.log(`[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}`);
});
