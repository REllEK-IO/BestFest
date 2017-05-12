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
        db.Festival.findAll({}).then(function(data){
            res.render("search", { data : data});
        });
    });

    // search route loads blog.html
    app.get("/user", function(req, res) {
        res.render("user", null);
    });

    // festivals route loads author-manager.html
    app.get("/festival", function(req, res) {
        //Get all review scores for festival
        //average
        //{}
        res.render("festival", null);
    });
    //////This returns an html page of the festival of name if it exists. Otherwise 404
    //
    //@res.params.name
    app.get("/festival/by/:name", function(req, res) {
        // //Query db.festival for props
        var festObj = {};
        var reviewObj = {};

         db.Festival.findOne({
            where:{ name: req.params.name }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
         }).then((data) => {
            festObj = {
                name: data.name,
                location: data.location,
                dates: data.dates,
                camping: data.camping,
                website: data.url,
                summary: data.summary,
                image: data.img_url,
                overall: data.overall,
                festivalId: data.id
            }

        db.Review.findAll({
               where:{festival: req.params.name}
            }).then((data) => {
            reviewObj = {
                overall: data.overall,
                security: data.security,
                sound: data.sound,
                text: data.text_box,
                createdAt: data.createdAt,
                thumbs: data.thumbs,
                tags: data.tags,

            }
            
        });
            console.log(festObj);
            console.log(reviewObj);
        
    });
        //Create object for template

        //Take Festival name from template object, then query Reviews for all of Festival Name
        // where : { festival: name }
        //Take Response and place in second Object

        //Build Complete Template Object out of Festival + Reviews
        //Look at log for keys, the create an object that goes 
        //Into your festival mixin variable parameters
        
        // var pugData = {//Set params in here from data obj with names corresponding to festival mxin};
        
        // res.render("festival", pugData);

        //Pass Template Object here
        // res.render("festival", {});
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