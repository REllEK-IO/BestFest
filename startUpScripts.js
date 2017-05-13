var db = require("./models");
var xlsxj = require("xlsx-to-json");
var fs = require('fs');


// const updateCreateUser = function (user, type) {

// }

// const updateCreateReview = function (reviewObj) {
//     db.Review.findOne({
//         where: {
//             user_id: reviewObj.user_id,
//             festival_id: reviewObj.festival_id
//         }
//     }, {
//         include: [db.User, db.Festival]
//     }).then((data) => {
//         if (data !== null) {
//             db.Review.create(reviewObj, {
//                 include: [db.User, db.Festival]
//             }).then((dataReview) => {
//                 return dataReview;
//             });
//         } else {
//             return "Review already exists!";
//         }
//     })
// }

const SetUp = (function () {
    var runScript = function () {
        db.User.findOne({
            where: {
                user_name: "User"
            }
        }).then((data) => {
            if (data === null) {
                db.User.create({
                    user_name: "User",
                    user_type: "user"
                }).then((dataUser) => {
                    console.log(dataUser.user_name);
                    db.User.findOne({
                        where: {
                            user_name: "Admin"
                        }
                    }).then((data) => {
                        if (data === null) {
                            db.User.create({
                                user_name: "Admin",
                                user_type: "admin"
                            }).then((dataUser) => {
                                console.log(dataUser.user_name);
                            })
                        } else {
                            return "Admin" + " already exists!";
                        }
                    })
                })
            } else {
                console.log("User" + " already exists!");
                db.User.findOne({
                    where: {
                        user_name: "Admin"
                    }
                }).then((data) => {
                    if (data === null) {
                        db.User.create({
                            user_name: "Admin",
                            user_type: "admin"
                        }).then((dataUser) => {
                            console.log(dataUser);
                        })
                    } else {
                        console.log("Admin" + " already exists!");
                    }
                })
            }
        })

        // db.User.upsert({
        //     user_name: "Tempo",
        //     user_type: "user"
        // },{
        //     where : {
        //         user_name : "Tempo"
        //     }
        // }).then(() => {
        //     db.User.upsert({
        //         user_name: "Beatz",
        //         user_type: "user"
        //     },{
        //         where : {
        //             user_name: "Beatz"
        //         }
        //     }).then(() => {
        //         db.User.upsert({
        //             user_name: "Mixn",
        //             user_type: "admin"
        //         }).then(() => {
        //             db.User.upsert({
        //                 user_name: "Raza",
        //                 user_type: "user"
        //             }).then(() => {
        //                 db.Review.upsert({
        //                     "title": null,
        //                     "festival": "Coachella",
        //                     "overall": 4,
        //                     "security": 3,
        //                     "text_box": null,
        //                     "tags": null,
        //                     "thumbs": 0,
        //                     "id": 1,
        //                     "createdAt": "2017-05-10T22:00:52.000Z",
        //                     "updatedAt": "2017-05-10T22:00:52.000Z",
        //                     "user_id": 1,
        //                     "festival_id" : 1
        //                 }, {
        //                     include: [db.User]
        //                 }).then((resp) => {
        //                     db.Review.upsert(, {
        //                         include: [db.User]
        //                     }).then((resp) => {
        //                         console.log("***Testing Set Up Script Complete***");
        //                     })
        //                 })
        //             })
        //         })
        //     })
        // })
    }

    var updateCreate = function () {
        importData();
        var festivalObj = JSON.parse(fs.readFileSync('./festival_output.json', 'utf8'));
        var parsedFestival = [];
        var i = 0;
        if (i <= festivalObj.length) {
            for (var j = 0; j < festivalObj.length; j++) {
                parsedFestival.push(parseFestival(festivalObj[j]));
            }
            updateCreateCall(parsedFestival, i, updateCreateCall);
        } else {
            console.log("Something went wrong at updateCreate!");
        }

    }

    var importData = function () {
        xlsxj({
            input: "./documents/festival info.xlsx",
            output: "festival_output.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log("Wrote to festival_output.json");
            }
        });
    }

    var parseFestival = function (festivalObj) {
        var parsedFestival = {};

        for (key in festivalObj) {
            switch (key) {
                case "Festival Name":
                    parsedFestival["name"] = festivalObj["Festival Name"];
                    break;
                case "Camping":
                    parsedFestival["camping"] = (festivalObj["Camping"].toLowerCase() === "yes" || festivalObj["Camping"].toLowerCase() === "no") ? festivalObj["Camping"] : "no";
                    break;
                case "Genre":
                    parsedFestival["genre"] = festivalObj["Genre"];
                    break;
                case "festival_type":
                    parsedFestival["festival_type"] = festivalObj["festival_type"];
                    break;
                case "Dates":
                    parsedFestival["dates"] = festivalObj["Dates"];
                    break;
                case "Website":
                    parsedFestival["url"] = festivalObj["Website"];
                    break;
                case "Location":
                    parsedFestival["location"] = festivalObj["Location"];
                    break;
                case "Summary":
                    parsedFestival["summary"] = festivalObj["Summary"];
                    break;
                case "Img url":
                    parsedFestival["img_url"] = festivalObj["Img url"];
                    break;
                case "optional":
                    parsedFestival["optional"] = festivalObj["optional"];
                    break;
            }
        }
        return parsedFestival;
    }

    var updateCreateCall = function (parsedFestival, i, cb) {
        if (i < parsedFestival.length) {
            db.Festival.find({
                where: {
                    name: parseFestival.name
                }
            }).then((dataFest) => {
                if (dataFest === null) {
                    db.Festival.create(parsedFestival[i]).then((data) => {
                        i++;
                        console.log("updateCreated Festival : " + parsedFestival.name + " :/ ");
                        cb(parsedFestival, i, updateCreateCall);
                    })
                }
                else{
                    db.Festival.update(parsedFestival[i], {where: {name: parseFestival[i].name}}).then((data) => {
                        i++;
                        console.log("updateCreated Festival : " + parsedFestival.name + " :/ ");
                        cb(parsedFestival, i, updateCreateCall);
                    })
                }
            })

        } else {
            console.log("***All festivals in spreadsheet wrote into database***");
            runScript();
        }
    }


    return {
        run: runScript,
        importFestivals: updateCreate
    }
})();

module.exports = SetUp;

// updateCreateUser("Tempo","user").then((data)=>{
//     console.log(data);
//     updateCreateUser("Beatz","user").then((data)=>{
//         console.log(data);
//         updateCreateUser("Mixn","admin").then((data)=>{
//             console.log(data);
//             updateCreateUser("Raza","user").then((data)=>{
//                 console.log(data);
//                 updateCreateReview(reviewOne).then((data)=>{
//                     console.log(data);
//                     updateCreateReview(reviewTwo).then((data)=>{
//                         console.log(data);
//                         console.log("***Testing Set Up Script Complete***");
//                     })
//                 })
//             })
//         })
//     })
// })