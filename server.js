require("dotenv").config();

const express = require("express");
const router = require("./routes");
const port = process.env.APP_PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const dbInitialSetup = require("./dbInitialSetup");

router(app);

dbInitialSetup();

app.listen(port, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}.\n`);
});

`https://youtu.be/dQw4w9WgXcQ`;
