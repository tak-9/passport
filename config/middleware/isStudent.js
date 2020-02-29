// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {

  if (req.user) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user.usertype === "student") {
      return next();
    } else {
      // If the user isn't logged in, unauthorized
      return res.status(401).send("unauthorized");  
    }
  } else { 
    // If the user isn't logged in, unauthorized
    return res.status(401).send("unauthorized");  
  }
};
