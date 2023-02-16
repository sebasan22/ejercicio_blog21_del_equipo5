const writerAutenticate = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleId === 2) {
    console.log(req.user.roleId);
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = writerAutenticate;
