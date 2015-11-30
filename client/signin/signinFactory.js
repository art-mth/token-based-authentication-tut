angular.module('App.signinFactory', [])

.factory('signinFactory', ['$http', function($http) {
  var signin = function(user) {
    return $http({
        method: 'POST',
        url: '/api/auth/signin',
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
  };

  return {
    signin: signin
  };
}]);