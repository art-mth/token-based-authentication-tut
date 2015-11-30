/*

routeConfig.js
configure routes for our app
 
 */

module.exports = function(app, express, db) {
  // serve all static files from the client folder
  app.use(express.static(__dirname + '/../../client'));

  // logging requests to the server
  var morgan = require('morgan');
  // set development mode for morgan --> specifies logging format
  app.use(morgan('dev'));

  // handling all authentication (signup, signin, route protection)
  var authRouter = express.Router();
  require(__dirname + '/../auth/authRouter.js')(authRouter, db);
  app.use('/api/auth', authRouter);

  // authCtrl contains function 'authenticate' to check user access rights
  var authCtrl = require(__dirname + '/../auth/authCtrl.js')(db);

  // handling all data requests for this application
  var dataRouter = express.Router();
  // protect all /api/data routes
  dataRouter.use(authCtrl.authenticate);
  require(__dirname + '/../data/dataRouter.js')(dataRouter);
  app.use('/api/data', dataRouter);
};
