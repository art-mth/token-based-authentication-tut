/*

database.js
database setup

*/

// ORM for interaction with SQL database
var sequelize = require('sequelize');

// instantiates a new Sequelize database
var db = new sequelize(
  // database username and password do not matter for sqlite
  'database',
  'username',
  'password', {
    host: 'localhost',
    dialect: 'sqlite',
    // the max and min pool size should depend on the load the database has to handle
    pool: {
      max: 10,
      min: 2,
      // milliseconds connection must be idle before being released
      idle: 100000
    },
    // file where sqlite data is stored
    storage: __dirname + '/db.sqlite',
    logging: false
  });

db.User = db.import(__dirname + '/model/user.js');

// sync new model with database
// if the database already exists it is left like is
// otherwise it is created for you
db.sync()
.then(function() {
  console.log('database is up and running');
});

module.exports = db;
