const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
        next()
    } else {
        res.render("login");
    }
}

module.exports = isAuthenticated