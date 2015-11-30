/*

user.js
user model/schema

*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    // default size for STRING is 255 bits
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });
};
