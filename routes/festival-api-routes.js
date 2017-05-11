// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the festival
    app.get("/api/festival", function(req, res) {

    });

    // Get rotue for retrieving a single post
    app.get("/api/festival/:id", function(req, res) {

    });

    // DELETE route for deleting festival
    app.delete("/api/festival/:id", function(req, res) {

    });

    // PUT route for updating festival
    app.put("/api/festival", function(req, res) {

    })
}