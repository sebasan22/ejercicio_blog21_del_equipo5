function makeUserAvailableInViews(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  } else {
    res.locals.user = {};
  }
  return next();
}
module.exports = makeUserAvailableInViews;
