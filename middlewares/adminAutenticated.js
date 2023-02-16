const adminAutenticate = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleId === 4) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = adminAutenticate;
