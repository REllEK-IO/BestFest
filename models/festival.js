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
        overall: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0.0
        },
        camping: {
            type: DataTypes.ENUM('yes', 'no'),
            defaultValue: 'no'
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Variety"
        },
        festival_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        summary: {
            type: DataTypes.TEXT,
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
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // Associating Author with Posts
                // When an Author is deleted, also delete any associated Posts
                Festival.hasMany(models.Review, {
                    onDelete: "cascade",
                    foreignKey: "festival_id"
                });
            }
        }
    });
    return Festival;
};