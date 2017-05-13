// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {
    // index route loads view.html
    app.get("/", function (req, res) {
        res.render("construction", null);
    });
    app.get("/index", function (req, res) {
        res.render("index", null);
    });
    // from route loads cms.html
    app.get("/form", function (req, res) {
        res.render("form", null);
    });
    // search route loads blog.html
    app.get("/search", function (req, res) {
        db.Festival.findAll({}).then(function (data) {
            res.render("search", {
                data: data
            });
        });
    });
    app.get("/search/:term", function (req, res) {
        if (req.params.term.trim() === "" || req.params.term === "undefined") {
            res.redirect("/search");
        }
        db.Festival.findAll({
            where: [
                "name like ?",
                '%' + req.params.term + '%'
            ]
        }).then(function (data) {
            if (data.length > 1) {
                res.render("searchEmbed", {
                    data: data
                });
            } else {
                console.log("redirecting to!!!!!!!!!!!!!1" + data[0].name);
                res.redirect("/festival/" + data[0].name);
            }
        });
    });
    // search route loads blog.html
    app.get("/user", function (req, res) {
        res.render("user", null);
    });
    // festivals route loads author-manager.html
    // app.get("/festival", function (req, res) {
    //     //Get all review scores for festival
    //     // db.Review.findAll({
    //     //     where:{
    //     //        festival: req.pararams.festival
    //     //     } 
    //     // }).then((data)=>{
    //     // }
    //     // var total = 0;
    //     // for(var i = 0; i < data.length; i ++){
    //     //     total+=data[i];
    //     // }
    //     // var avg = total/data.length;
    //     // console.log(data);
    //     //{}
    //     res.render("festival", null);
    // });
    //////This returns an html page of the festival of name if it exists. Otherwise 404
    //
    //@res.params.name
    app.get("/festival/:name", function (req, res) {
        // //Query db.festival for props
        var festivalName = req.params.name;
        console.log("///////////////////////////////////" + festivalName);
        var festObj = {};
        var reviewArr = [];

        db.Festival.findOne({
            where: {
                name: festivalName
            }
        }).then((data) => {
            festObj = {
                name: data.name,
                location: data.location,
                dates: data.dates,
                camping: data.camping,
                website: data.url,
                summary: data.summary,
                image: data.img_url,
                stars: data.overall,
                festivalId: data.id
            };
            db.Review.findAll({
                where: {
                    festival: festivalName
                }
            }).then((dataRev) => {

                // //Pushes reviews into an array
                // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  " +dataRev.length);
                if (dataRev.length > 0) {
                    for (var i = 0; i < dataRev.length; i++) {
                        reviewArr.push({
                            overall: dataRev[i].overall,
                            security: dataRev[i].security,
                            sound: dataRev[i].sound,
                            text: dataRev[i].text_box,
                            createdAt: dataRev[i].createdAt,
                            thumbs: dataRev[i].thumbs,
                            tags: dataRev[i].tags
                        });
                    }
                    festObj["reviews"] = reviewArr;
                    console.log("******************//////", festObj);

                } else {
                    reviewArr.push({
                        overall: dataRev.overall,
                        security: dataRev.security,
                        sound: dataRev.sound,
                        cost: dataRev.cost,
                        text: dataRev.text_box,
                        createdAt: dataRev.createdAt,
                        thumbs: dataRev.thumbs,
                        tags: dataRev.tags
                    });
                    festObj["reviews"] = reviewArr;
                    console.log("******************///else///", festObj);
                }
                res.render("festivalEmbed", {
                    data: festObj,
                    // dataRev:dataRev,
                });
            }).catch(err => res.status(404).send("Meeting not found"));
        }).catch(err => res.status(404).send("Meeting not found"));

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
    app.get("/test", function (req, res) {
        var objPug = {
            something: "This goes into head 1",
            example: "This goes into head 2"
        }
        res.render("test", objPug);
    });
};