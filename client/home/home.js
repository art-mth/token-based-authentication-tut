angular.module('App.home', [])

.controller('homeCtrl', ['homeFactory', function(homeFactory) {
  var self = this;

  self.message = "";

  self.logout = function() {
    homeFactory.logout();
  };

  self.getMessage = function() {
    homeFactory.getMessage()
      .then(function(resp) {
        self.message = resp;
      });
  };
}]);
