// Date:
// Show Review: (Average of all Overall Reviews)
// Genre: Required
// Festival Type:
// Festival Name: Required
// Venue:
// General Summary of Festival: Required
// URL:
// Image URL:
// Location:
// Top: (Tags)
// Optional Info: []
// Optional User Images

//////////////////////Festivals
//Top Tags and Score are abstracted from user reviews and are not stored here.
//
module.exports = function(sequelize, DataTypes) {
    // var sequelize = require('sequelize');

    var Festival = sequelize.define("Festival", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        festival_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dates: {
            type: DataTypes.STRING,
            allowNull: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        optional: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usr_img_urls: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Festival;
};