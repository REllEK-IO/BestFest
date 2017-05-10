// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


    // index route loads view.html
    app.get("/", function(req, res) {
        res.render("construction", null);
    });

    app.get("/index", function(req, res) {
        res.render("index", null);
    });

    // from route loads cms.html
    app.get("/form", function(req, res) {
        res.render("form", null);
    });

    // search route loads blog.html
    app.get("/search", function(req, res) {
        res.render("search", null);
    });

    // If we have time. All Festivals render
    app.get("/festival", function(req, res) {
        //Get all review scores for festival
        //average
        //{}
        res.render("festival", null);
    });
    //////This returns an html page of the festival of name if it exists. Otherwise 404
    //
    //@res.params.name
    app.get("/festival/:name", function(req, res) {
        //Query db.festival for props
        //Create object for template

        //Take Festival name from template object, then query Reviews for all of Festival Name
        // where : { festival: name }
        //Take Response and place in second Object

        //Build Complete Template Object out of Festival + Reviews

        //Pass Template Object here
        res.render("festival", null);
    });
    // app.get("/test", function(req, res){
    //     db.User.create({
    //         user_name: "Bob"
    //     }).then((data) => {
    //         console.log(data.dataValues.user_name);
    //     })

    //     db.User.create({
    //         user_name: "Boob"
    //     }).then((data) => {
    //         console.log(data.dataValues.user_name);
    //     })

    //     db.Review.create({
    //         festival: "Something",
    //         overall: 5,
    //         user_id: 2
    //     },{
    //         include: [db.User]
    //     })

    //     db.User.findAll({where: {
    //         user_name: "Bob"
    //     }}).then(function(data){
    //         res.json(data);
    //     });
    // })

    // Test pug's object insertions
    app.get("/test", function(req, res) {
        var objPug = {
            something: "This goes into head 1",
            example: "This goes into head 2"
        }
        res.render("test", objPug);
    });
};