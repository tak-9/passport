// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  if (req.user) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user.usertype === "staff") {
      return next();
    } else if (req.user.usertype === "student") {
      return res.redirect("/student");
    } else {
      // for any other user type
      return res.redirect("/");
    }
  } else { 
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/");
  }
};
