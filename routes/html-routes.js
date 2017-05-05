// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  // index route loads view.html
  app.get("/", function(req, res) {
    res.render("construction",null);
  });

  // cms route loads cms.html
  app.get("/form", function(req, res) {
    res.render("form", null);
  });

  // blog route loads blog.html
  app.get("/search", function(req, res) {
    res.render("search", null);
  });

  // authors route loads author-manager.html
  app.get("/festival", function(req, res) {
    res.redirect("/");
  });

};
