/*

middlewareConfig.js
configures middleware for our app

 */

// middleware to populate req.body with the parsed body
// can handle different kinds of data from json to URL-encoded
var bodyParser = require('body-parser');

module.exports = function(app, express) {

  // configure app to use bodyParser middleware for JSON data
  app.use(bodyParser.json());

};
