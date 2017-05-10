//Need to add in Google O-Auth and passwords

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the Author model a name of type STRING
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //Key from google
        key: {
            type: DataTypes.STRING,
            //Change once have OAUTH
            allowNull: true,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_type: {
            type : DataTypes.ENUM('user', 'admin'),
            allowNull: false
        }
        // //https://nodeontrain.xyz/tuts/secure_password/
        // password_digest: {
        //     type: DataTypes.STRING,
        //     validate: {
        //         notEmpty: true
        //     }
        // },
        // password: {
        //     type: DataTypes.VIRTUAL,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true
        //     }
        // },
        // password_confirmation: {
        //     type: DataTypes.VIRTUAL
        // }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // Associating Author with Posts
                // When an Author is deleted, also delete any associated Posts
                User.hasMany(models.Review, {
                    onDelete: "cascade",
                    foreignKey: "user_id"
                });
            }
        }
    });
    return User;
};