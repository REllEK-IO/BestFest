var db = require("./models");
var xlsxj = require("xlsx-to-json");
var fs = require('fs');

const SetUp = (function() {
    var runScript = function() {
        db.User.create({
            user_name: "Tempo",
            user_type: "user"
        }).then(() => {
            db.User.create({
                user_name: "Beatz",
                user_type: "user"
            }).then(() => {
                db.User.create({
                    user_name: "Mixn",
                    user_type: "admin"
                }).then(() => {
                    db.User.create({
                        user_name: "Raza",
                        user_type: "user"
                    }).then(() => {
                        db.Review.create({
                            "title": null,
                            "festival": "something",
                            "overall": 5,
                            "security": 5,
                            "text_box": null,
                            "tags": null,
                            "thumbs": 0,
                            "id": 1,
                            "createdAt": "2017-05-10T22:00:52.000Z",
                            "updatedAt": "2017-05-10T22:00:52.000Z",
                            "user_id": 1
                        }, {
                            include: [db.User]
                        }).then((resp) => {
                            db.Review.create({
                                "title": null,
                                "festival": "something",
                                "overall": 5,
                                "security": 5,
                                "text_box": null,
                                "tags": null,
                                "thumbs": 0,
                                "id": 2,
                                "createdAt": "2017-05-10T22:01:07.000Z",
                                "updatedAt": "2017-05-10T22:01:07.000Z",
                                "user_id": 4
                            }, {
                                include: [db.User]
                            }).then((resp) => {
                                console.log("***Testing Set Up Script Complete***");
                            })
                        })
                    })
                })
            })
        })
    }

    var importData = function() {
        xlsxj({
            input: "./documents/festival info.xlsx",
            output: "festival_output.json"
        }, function(err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
    }

    var updateCreate = function() {
        var festivalObj = JSON.parse(fs.readFileSync('file', 'utf8'));
        var i = 0;
        if (i < festivalObject.length) {
            var parsedFestival = pareseFestival(festivalObj[i]);
            db.Festival.upsert(parsedFestival).then((data) => {
                console.log("updateCreated Festival : " + festivalObj.name + " :/ " + data);
            });
        }

    }

    var updateCreateCall = function(i, ) {

    }

    var parseFestival = function(festivalObj) {
        var parsedFestival = {};

        for (key in festivalObj) {
            switch (key) {
                case "Festival Name":
                    parsedFestival["name"] = festivalObj[key];
                    break;
                case "Camping":
                    if (parsedFestival["camping"] === "yes" || parsedFestival["camping"] === "no") ? parsedFestival["camping"] = festivalObj[key] : parsedFestival["camping"] = "no";
                    break;
                case "genre":
                    parsedFestival["genre"] = festivalObj[key];
                    break;
                case "festival_type":
                    parsedFestival["festival_type"] = festivalObj[key];
                    break;
                case "Dates":
                    parsedFestival["dates"] = festivalObj[key];
                    break;
                case "Website":
                    parsedFestival["url"] = festivalObj[key];
                    break;
                case "Location":
                    parsedFestival["location"] = festivalObj[key];
                    break;
                case "Summary":
                    if (festivalObj[key].length <= 3000) parsedFestival["summary"] = festivalObj[key]: festivalObj[key].substring(0, 300) + parsedFestival["summary"] = ;
                    break;
                case "img_url":
                    parsedFestival["img_url"] = festivalObj[key];
                    break;
                case "optional":
                    parsedFestival["optional"] = festivalObj[key];
                    break;
            }
        }

        return parsedFestival;
    }


    return {
        run: runScript,
        importFestivals: importData
    }
})();

module.exports = SetUp;