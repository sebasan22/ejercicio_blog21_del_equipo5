const writerAutenticate = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleCode >= 200) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = writerAutenticate;
