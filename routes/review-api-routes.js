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

    // GET route for getting all of the posts
    app.get("/api/review/user/:name", function(req, res) {
        db.User.findOne({
            where: {
                user_name: req.params.name
            }
        }).then((data) => {
            db.Review.findAll({
                where: {
                    user_id: data.id
                }
            }).then((fin) => {
                res.json(fin);
            })
        })
    });

    // Get route for retrieving a single post
    app.get("/api/festival/review/:name", function(req, res) {
        db.Review.findAll({
            where: {
                festival: req.params.name
            }
        }).then((data) => {
            res.json(data);
        })
    });


    // POST route for saving a new post
    app.post("/api/review", function(req, res) {
        var newReview = {};
        var user = req.body.user;

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
        }).then(function(data) {
            newReview["user_id"] = data.id;
            console.log(data.id);
            db.Review.create(newReview, {
                include: [db.User]
            }).then((resp) => {
                res.json(resp);
            })
        })

        //Update the Overall Score of the Festival
    });

    // DELETE route for deleting posts
    app.delete("/api/review/delete/:id", function(req, res) {
        //Get user name from db
        db.User.getOne({
                where: {
                    id: req.body.id
                }
            }).then((data) => {
                if (Number(req.params.id) === Number(data.id) || data.user_type === "admin") {
                    db.Review.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then((fin) => {
                        res.json("Review with id = " + fin + " destroyed.");
                    })
                } else {
                    res.json("Cannot delete review.");
                }
            })
            //Delete if same user or or Admin
    });

    // PUT route for updating posts
    app.put("/api/posts", function(req, res) {

    })
}