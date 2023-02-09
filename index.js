const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const router = require("./routes");

const db = require("./models");

app.set("view engine", "ejs");

app.use(router);

app.listen(port, () => {
  console.log("Escuchando en puerto 3000");
});
