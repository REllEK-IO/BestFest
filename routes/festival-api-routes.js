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

    // GET route for getting al(fl of the festival
    app.get("/api/festival", function(req, res) {
        db.Festival.findAll({}).then(function(data){
            res.json(data);
        });      
    });

    // =====Returns festival information base on festival name =======
    app.get("/api/festival/:name", function(req, res){
        db.Festival.findOne({
            where: {
                name: req.params.name
            }
        }).then(function(data){
            res.json(data);
        });
    });
    // =====Posts new festival to database ======
    app.post("/api/festivals/add", function(req, res) {
      db.Festival.create({
        name: req.body.name,
        genre: req.body.genre,
        overall: req.body.overall,
        festival_type: req.body.Outdoor,
        dates: req.body.dates,   
        url: req.body.url,
        img_url: req.body.img_url,
        location: req.body.location,
        optional: req.body.optional
      }).then(function(data){
        res.json(data);
      });
    });

    // POST route for saving a new post
    app.post("/api/review", function(req, res) {
        var newReview = {};
        var user = req.body.user;

        db.User.create({
            user_name: "Ass"
        }).then(() => {
            db.User.create({
                user_name: "ewok"
            }).then(() => {
                db.User.create({
                    user_name: "Tastic"
                });
            }).then(() => {
                for (key in req.body) {
                    switch (key) {
                        case "title":
                            newReview["title"] = req.body[key];
                            break;
                        case "festival":
                            newReview["festival"] = req.body[key];
                            break;
                        case "overall":
                            newReview["overall"] = Number(req.body[key]);
                            break;
                        case "security":
                            newReview["security"] = Number(req.body[key]);
                            break;
                        case "text_body":
                            newReview["text_body"] = req.body[key];
                            break;
                        case "tags":
                            newReview["tags"] = req.body[key];
                            break;
                    }
                }

                db.User.findOne({
                    where: {
                        user_name: user
                    }
                }).then(function(usr) {
                    newReview["user_id"] = usr.id;
                    console.log(usr.id);
                    db.Review.create(newReview, {
                        include: [db.User]
                    }).then((resp) => {
                        res.json(resp);
                    })
                })
            });
        });
    });

    // DELETE route for deleting festival
    app.delete("/api/festival/:id", function(req, res) {

    });

    // PUT route for updating festival
    app.put("/api/festival", function(req, res) {

    })
}