var db = require("../models");

module.exports = function(app) {
    //Returns json of the requested user
    //To do add admin verification
    app.get("/api/user/id/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            res.json(data);
        })
    });

    //Returns json of the requested user
    app.get("/api/user/name/:name", function(req, res) {
        db.User.findOne({
            where: {
                id: req.body.name
            }
        }).then((data) => {
            res.json(data);
        })
    });

    //Creates a user.
    app.post("/api/user", function(req, res) {
        db.User.create(req.body).then(function(data) {
            res.json(data);
        });
    });

    app.put("api/update/user/id", function(req, res) {
        if (req.body.name !== undefined && Number(req.params.id) === Number(req.body.id)) {
            db.User.update({
                where: {
                    id: req.params.id
                }
            }).then((data) => {
                res.json(data);
            })
        } else {
            res.json({ err: "Invalid update" });
        }

    });

    //Deletes user by id. Returns json of err or success
    app.delete("/api/del/user/:id", function(req, res) {
        //Find out if current user is an admin
        console.log(req.body);
        db.User.findOne({
            where: {
                user_name: req.body.user
            }
        }).then((data => {
            if (data.user_type === "admin" || Number(req.params.id) === Number(data.id)) {
                if (data.user_type === "admin" && Number(data.id) === Number(req.params.id)) {
                    res.json({
                        err: "You cannot delete yourself"
                    });
                } else {
                    db.User.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then((fin) => {
                        res.json({
                            success: ("User ID: " + fin + " Was deleted")
                        });
                    })
                }
            } else {
                res.json({
                    err: "Fuck You."
                });
            }
        }));
    });
}