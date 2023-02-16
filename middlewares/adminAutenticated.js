const adminAutenticate = (req, res, next) => {
  if (
    (req.isAuthenticated() && req.user.roleId === 4) ||
    req.user.roleId === 3 ||
    req.user.roleId === 2
  ) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = adminAutenticate;
