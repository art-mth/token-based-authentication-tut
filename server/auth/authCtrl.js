/*

authCtrl.js
configuring routes for authRouter

*/

// promise library to avoid callback hell
var Promise = require('bluebird');
// module for securely hashing passwords
var bcrypt = require('bcrypt-nodejs');
// module implementing authO jwt's
var jwt = require('jsonwebtoken');

module.exports = function(db) {
  return {
    signup: function(req, res) {
      // pull out user data
      var username = req.body.username;
      var password = req.body.password;
      // query for user with username(unique)
      db.User.findOne({
          where: {
            username: username
          }
        })
        .then(function(user) {
          console.log('user with username: ' + username + ' exists: ' + !!user);
          if (user) {
            // username is already taken
            res.json({
              success: false
            });
          } else {
            var hashing = Promise.promisify(bcrypt.hash);

            // hash password and save user to the database
            hashing(password, null, null)
              .then(function(hash) {
                // create user in db
                db.User.create({
                    username: username,
                    password: hash
                  })
                  .then(function(user) {
                    console.log('user with username: ' + username + ' got created: ' + !!user);
                    // create token with username and id
                    var signUser = {
                      id: user.id,
                      username: user.username
                    }
                    jwt.sign(signUser, process.env.TOKEN_SECRET, {
                      expiresIn: '1h'
                    }, function(token) {
                      res.json({
                        success: true,
                        token: token
                      });
                    });
                  });
              });
          }
        });
    },

    signin: function(req, res) {
      // pull out user data
      var username = req.body.username;
      var password = req.body.password;
      // query for user with username(unique)
      db.User.findOne({
          where: {
            username: username
          }
        })
        .then(function(user) {
          console.log('user with username: ' + username + ' exists: ' + !!user);
          if (!user) {
            // user with supplied username does not exist
            res.json({
              success: false
            });
          } else {
            // user with supplied username exists
            // compare supplied password and password from database
            bcrypt.compare(password, user.password, function(err, success) {
              if (err) {
                return console.log('Error ocurred while comparing password: ', err);
              }
              if (!success) {
                console.log('Wrong password supplied for user with username: ' + username);
                res.json({
                  success: false
                });
              } else {
                console.log('User with username: ' + username + ' supplied correct credentials');
                // create token with username and id
                var signUser = {
                  id: user.id,
                  username: user.username
                }
                var token = jwt.sign(signUser, process.env.TOKEN_SECRET, {
                  expiresIn: '1h'
                }, function(token) {
                  res.json({
                    success: true,
                    token: token
                  });
                });
              }
            });
          }
        });
    },

authenticate: function(req, res, next) {
  // pull out token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    // decode and verify token
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) {
        // failed decoding token --> error or token not handed out by server
        res.status(403).json({
          success: false
        });
      } else {
        // token successfully decoded
        // set user on req for further middleware to use
        req.user = decoded;
        console.log('Successfully authenticated token, access granted for user: ' + req.user.username);
        // move on to next middleware
        next();
      }
    });
  } else {
    // no token supplied
    res.status(403).send({
      success: false
    });
  }
}
  };
};
