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
            allowNull: true,
        },
        //Festival Name
        festival: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //Overall score of festival
        overall: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cost: {
            type: DataTypes.ENUM('Cheap','Average','Pricey'),
            allowNull: true,
        },
        
        //Security Score
        security: {
            type: DataTypes.ENUM('Tight','Average','Lax'),
            allowNull: true,
        },
        //Sound Score
        sound: {
            type: DataTypes.ENUM('Weak','Average','Bumpin'),
            allowNull: true,
        },
        //Text body
        text_body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        //Tags
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //Thumbs up of this post
        thumbs: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                models.Review.belongsTo(models.User, {
                    foreignKey: "user_id"
                });
                models.Review.belongsTo(models.Festival, {
                    foreignKey: "festival_id",
                });
            }
        }
    });
    return Review;
};