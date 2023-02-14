require("dotenv").config();

const express = require("express");
const router = require("./routes");
const port = process.env.APP_PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//PassPort - Require
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const dbInitialSetup = require("./dbInitialSetup");

//////////////////////////////////////////// Passport y configuración

/* app.use(
  session({
    secret: "",
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.session())

passport.use(
  new LocalStrategy(async (username, password, done) => {
    //Buscamos el usuario en la db
    try {
      User.findOne({ where: { email: username } })
      await ((user) => {
        // Condiciones para corroborar que las credenciales del usuario son correctas
      })
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

app.post("/login",
passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/login"
})) */

router(app);

dbInitialSetup();

app.listen(port, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}.\n`);
});
