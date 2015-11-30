angular.module('App.signupFactory', [])

.factory('signupFactory', ['$http', function($http) {
  var signup = function(user) {
    return $http({
        method: 'POST',
        url: '/api/auth/signup',
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
  };

  return {
    signup: signup
  };
}]);
