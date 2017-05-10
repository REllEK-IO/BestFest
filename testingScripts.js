var db = require("./models");

const SetUp = (function () {
	var runScript = function () {
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
	return {
		run : runScript
	}
})();

module.exports = SetUp;