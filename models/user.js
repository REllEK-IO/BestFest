module.exports = function(sequelize, DataTypes) {
    // var User = sequelize.define("User", {
    //   // Giving the Author model a name of type STRING
    //     user_name: {
    //       type: DataTypes.STRING,
    //       allowNull: false,
    //     },
    //     //Key from google
    //     key: {
    //       type: DataTypes.STRING,
    //       allowNull: false,
    //     },
    //     id: {
    //       type: DataTypes.INTEGER,
    //       autoIncrement: true,
    //       primaryKey: true
    //     },
    //     //https://nodeontrain.xyz/tuts/secure_password/
    //     password_digest: {
    //       type: Sequelize.STRING,
    //       validate: {
    //         notEmpty: true
    //       }
    //     },
    //     password: {
    //       type: Sequelize.VIRTUAL,
    //       allowNull: false,
    //       validate: {
    //         notEmpty: true
    //       }
    //     },
    //     password_confirmation: {
    //       type: Sequelize.VIRTUAL
    //     }
    //   },
    //   {
    //     // We're saying that we want our Author to have Posts
    //     classMethods: {
    //       associate: function(models) {
    //         // Associating Author with Posts
    //         // When an Author is deleted, also delete any associated Posts
    //         User.hasMany(models.Review, {
    //           onDelete: "cascade"
    //         });
    //       }
    //     }
    //   }
    // );
    return Author;
};