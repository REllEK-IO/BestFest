// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    var updateOverAll = function (name) {
        console.error("******Called**********");
        db.Review.findAll({
            where: {
                festival: name
            }
        }).then((dataRev) => {
            var reviewArr = [];
            if (dataRev.length > 1) {
                for (var i = 0; i < dataRev.length; i++) {
                    reviewArr.push(dataRev[i].overall);
                }
            } else if (dataRev === null) {
                reviewArr.push(0);
            } else {
                reviewArr.push(dataRev[0].overall);
            }
            var j;
            var sum = 0.0;
            for (j = 0; j < reviewArr.length; j++) {
                sum += reviewArr[j]
            }

            db.Festival.update({ overall: (sum / j) }, 
                        { where: { name: name } }
            ).then((data) => {
                console.log(name + " overall score updated: " + data);
                console.error("******End Call**********");
            })
        })
    }

    // GET route for getting all of the posts
    app.get("/api/review/user/:name", function (req, res) {
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
    app.get("/api/festival/review/:name", function (req, res) {
        db.Review.findAll({
            where: {
                festival: req.params.name
            }
        }).then((data) => {
            res.json(data);
        })
    });


    // POST route for saving a new post
    app.post("/api/review", function (req, res) {
        var newReview = {};
        var user = req.body.user;
        var festival = req.body.festival;

        console.log(req.body);

        for (key in req.body) {
            switch (key) {
                case "title":
                    newReview["title"] = req.body["title"];
                    break;
                case "festival":
                    newReview["festival"] = req.body["festival"];
                    break;
                case "overall":
                    newReview["overall"] = Number(req.body["overall"]);
                    break;
                case "security":
                    newReview["security"] = req.body["security"];
                    break;
                case "text_body":
                    newReview["text_body"] = req.body["text_body"];
                    break;
                case "tags":
                    newReview["tags"] = req.body["tags"];
                    break;
                case "year":
                    newReview["year"] = req.body["year"];
                    break;
                case "cost":
                    newReview["cost"] = req.body["cost"];
                    break;
                case "sound":
                    newReview["sound"] = req.body["sound"];
                    break;
            }
        }


        db.User.findOne({
            where: {
                user_name: user
            }
        }).then(function (data) {
            newReview["user_id"] = data.id;

            db.Festival.findOne({
            where: {
                name: festival
            }
        }).then(function (dataFest) {
                newReview["festival_id"] = dataFest.id;

                db.Review.create(newReview, {
                    include: [db.User,db.Festival]
                }).then((resp) => {
                    res.json(resp);
                    updateOverAll(newReview.festival);
                })
            });
        })
        //Update the Overall Score of the Festival
    });

    // DELETE route for deleting posts
    app.delete("/api/review/delete/:id", function (req, res) {
        //Get user name from db
        db.User.getOne({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            var festivalName = data.festival;
            if (Number(req.params.id) === Number(data.id) || data.user_type === "admin") {
                db.Review.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then((fin) => {
                    res.json("Review with id = " + fin + " destroyed.");
                    updateOverAll(festivalName);
                })
            } else {
                res.json("Cannot delete review.");
            }
        })
        //Delete if same user or or Admin
    });

    // PUT route for updating posts
    app.put("/api/posts", function (req, res) {

    })
}