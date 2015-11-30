angular.module('App.signin', [])

.controller('signinCtrl', ['signinFactory', '$window', '$state', function(signinFactory, $window, $state) {
  var self = this;

  self.user = {};

  self.signin = function() {
    signinFactory.signin(self.user)
      .then(function(data) {
        if (data.success) {
          $window.localStorage.setItem('authtoken', data.token);
          $state.go('home');
        } else {
          self.user = {};
        }
      });
  };
}]);
