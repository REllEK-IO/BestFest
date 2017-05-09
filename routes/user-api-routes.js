var db = require("../models");

module.exports = function(app) {
    // app.get("/api/authors", function(req, res) {

    // });

    // app.get("/api/authors/:id", function(req, res) {

    // });

    app.post("/api/user", function(req, res) {
        db.User.create(req.body).then(function(data) {
            res.json(data);
        });
    });

    // app.delete("/api/authors/:id", function(req, res) {

    // });

};