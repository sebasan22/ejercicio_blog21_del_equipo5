/*  const { User } = require("./models");  */

require("dotenv").config();

const express = require("express");
const router = require("./routes");
const port = process.env.APP_PORT || 3000;
const app = express();
const bcrypt = require("bcryptjs")

//PassPort - Require
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const dbInitialSetup = require("./dbInitialSetup");

//////////////////////////////////////////// Passport y configuración

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.session())

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'contrasenia'
  }, async (username, password, done) => {
    //Buscamos el usuario en la db
    try {
      const user = User.findOne({ where: { username } })
      if (!user) {
        console.log("Nombre de usuario incorrecto.");
        return done(null, false, { message: "Credenciales incorrectas" })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        console.log("La contraseña es incorrecta");
        return done(null, false, { message: "Credenciales incorrectas" })
      }
    }
    catch (error) {
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, req.session.passport.user)
})

passport.deserializeUser(async (id, done) => {
  User.findByPk(req.session.passport.user)
  try {
    await ((user) => {
      done(null, user);
    })
  }
  catch (error) {
    done(error, null)
  }
})


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

router(app);

dbInitialSetup();

app.listen(port, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}.\n`);
});
