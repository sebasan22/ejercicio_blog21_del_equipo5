const { User } = require("../models")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")

//////////////////////////////////////////// Passport y configuración
module.exports = (app) => {
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

                /////////////////////////////////////// Restricciones

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
    );

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
} 