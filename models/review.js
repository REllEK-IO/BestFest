// Overall:(Required)
// Festival:(Required) Must exist inside of our database
// Security:(Optional) Lax, Average, Tight (Int)
// Sound Quality:(Optional)
// Textbox:(Optional)
// Top Gear:(Optional tags)
// Thumbs Up(Defaults: 1)

module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        //Title of review
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //Festival Name
        festival: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //Overall score of festival
        overall: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //Security Score
        security: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //Cost Score
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //Sound Score
        sound: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //Text body
        text_box: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //Tags
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //Thumbs up of this post
        thumbs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                len: [1]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Review.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    })
    return Review;
};