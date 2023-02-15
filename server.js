
require("dotenv").config();
const express = require("express");
const router = require("./routes");
const port = process.env.APP_PORT || 3000;
const app = express();
const { User } = require("./models");
const bcrypt = require("bcryptjs")

//PassPort - Require
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const dbInitialSetup = require("./dbInitialSetup");

//////////////////////////////////////////// Passport y configuración
////////// Iniciamos Session de Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.session())
////////// Configuramos la estrategia de logueo, en este caso Local.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      ////////// Buscamos el usuario en la db.
      const user = await User.findOne({ where: { username } })
      if (!user) {
        console.log("Nombre de usuario incorrecto.");
        return done(null, false, { message: "Credenciales incorrectas" })
      }
      ////////// Corroboramos que la contraseña sea correcta.
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        console.log("La contraseña es incorrecta");
        return done(null, false, { message: "Credenciales incorrectas" })
      }
      ////////// Una vez corroboramos, almacenamos el usuario.
      return done(null, user)
    }
    catch (error) {
      return done(error);
    }
  })
)
////////// Estraemos la id del usuario mediante el seralizeUser
passport.serializeUser((user, done) => {
  done(null, user.id)
})

////////// Consultamos en la db y traemos el usuario completo con la id extraida del serailizeUser, esto genera
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user); // req.user
  } catch (error) {
    done(error);
  }
});


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

router(app);

dbInitialSetup();

app.listen(port, () => {
  console.log(`[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}`);
});
