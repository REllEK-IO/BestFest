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

    var updateCreate = function() {
        importData();
        var festivalObj = JSON.parse(fs.readFileSync('./festival_output.json', 'utf8'));
        var parsedFestival = [];
        var i = 0;
        if (i <= festivalObj.length) {
            for(var j = 0; j < festivalObj.length; j++){
                parsedFestival.push(parseFestival(festivalObj[j]));
            }
            updateCreateCall(parsedFestival, i, updateCreateCall);
        }
        else{
            console.log("Something went wrong at updateCreate!");
        }

    }

    var importData = function() {
        xlsxj({
            input: "./documents/festival info.xlsx",
            output: "festival_output.json"
        }, function(err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log("Wrote to festival_output.json");
            }
        });
    }

    var parseFestival = function(festivalObj) {
        var parsedFestival = {};

        for (key in festivalObj) {
            switch (key) {
                case "Festival Name":
                    parsedFestival["name"] = festivalObj[key];
                    break;
                case "Camping":
                    parsedFestival["camping"] = (parsedFestival["camping"] === "yes" || parsedFestival["camping"] === "no") ?  festivalObj[key] : "no";
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
                    parsedFestival["summary"] = (festivalObj[key].length <= 3000) ?  festivalObj[key]: festivalObj[key].substring(0, 300) + "...";
                    break;
                case "img_url":
                    parsedFestival["img_url"] = festivalObj[key];
                    break;
                case "optional":
                    parsedFestival["optional"] = festivalObj[key];
                    break;
            }
        }
        console.log(parsedFestival);
        return parsedFestival;
    }

    var updateCreateCall = function(parsedFestival, i, cb) {
        if(i < parsedFestival.length){
            db.Festival.upsert(parsedFestival[i]).then((data) => {
                i++;
                console.log("updateCreated Festival : " + parsedFestival.name + " :/ " + data);
                cb(parsedFestival, i, updateCreateCall);
            })
        }
        else{
            console.log("***All festivals in spreadsheet wrote into database***");
        }
    }


    return {
        run: runScript,
        importFestivals: updateCreate
    }
})();

module.exports = SetUp;