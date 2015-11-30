/*

server.js
express/node server 

*/

// load environment variables from .env file
// never put environment variables in your source code
require('dotenv').config({
  path: __dirname + '/../.env'
});

// lightweight middleware and routing framework for Node
var express = require('express');

var port = process.env.PORT || 3000;
var app = express();

// setup and configure database
var db = require(__dirname + '/../database/database.js');

// configure middleware
require(__dirname + '/config/middlewareConfig.js')(app, express);
// configure routes
require(__dirname + '/config/routeConfig.js')(app, express, db);

app.listen(port, function() {
  console.log('Server is listening on port: ' + port);
});
