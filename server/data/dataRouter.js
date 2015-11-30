/*

dataRouter.js
specifying routes for /api/data

*/

module.exports = function(app) {
  // app === dataRouter injected from server.js

  var dataCtrl = require(__dirname + '/dataCtrl.js')();

  // API endpoint for retrieving data for the application
  app.get('/', dataCtrl.getData);
};
