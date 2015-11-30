/*

authRouter.js
specifying routes for /api/auth

*/

module.exports = function(app, db) {
  // app === authRouter injected from server.js

  var authCtrl = require(__dirname + '/authCtrl.js')(db);

  // API endpoint for signup requests
  app.post('/signup', authCtrl.signup);
  // API endpoint for signin requests
  app.post('/signin', authCtrl.signin);
};
