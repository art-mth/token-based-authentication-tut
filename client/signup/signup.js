angular.module('App.signup', [])

.controller('signupCtrl', ['signupFactory', '$window', '$state', function(signupFactory, $window, $state) {
  var self = this;

  self.user = {};

  self.signup = function() {
    signupFactory.signup(self.user)
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
