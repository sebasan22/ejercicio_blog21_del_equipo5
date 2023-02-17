const atLeastAdmin = (req, res, next) => {
  if (req.user.roleCode >= 400) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = atLeastAdmin;
