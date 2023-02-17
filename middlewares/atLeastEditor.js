const writerAutenticate = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleCode >= 300) {
    next();
  } else {
    res.send("No tiene permisos para esa acción");
  }
};

module.exports = writerAutenticate;
