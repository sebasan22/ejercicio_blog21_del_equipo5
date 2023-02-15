
const passport = require("passport")
// Display a listing of the resource.

async function index(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/")
    } else {
        res.render("login")
    }
}

const login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
});


module.exports = {
    index,
    login
};
