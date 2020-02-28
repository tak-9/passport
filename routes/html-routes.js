// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var userType;

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isStaff = require("../config/middleware/isStaff");
var isStudent = require("../config/middleware/isStudent");


module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    console.log("app.get / req ", req.user);
    if (req.user) {
      if (req.user.usertype === "student") {
        res.redirect("/student");
      } else if (req.user.usertype === "staff") {
        res.redirect("/staff");
      }  
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user.usertype === "student") {
      res.redirect("/student");
    } else if (req.user.usertype === "staff") {
      res.redirect("/staff");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }

  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/student", isStudent, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/student.html"));
  });

  app.get("/staff", isStaff, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/staff.html"));
  });

  app.get("/both", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/both.html"));
  });


};
