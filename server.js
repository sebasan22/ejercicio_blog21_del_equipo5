require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const router = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");

app.set("view engine", "ejs");

app.use(router);

dbInitialSetup();

app.listen(port, () => {
  console.log("Escuchando en puerto 3000");
});
