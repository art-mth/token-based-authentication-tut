angular.module('App.homeFactory', [])

.factory('homeFactory', ['$http', '$state', function($http, $state) {
  var logout = function() {
    localStorage.clear();
    $state.go('signin');
  };

  var getMessage = function() {
    return $http({
      method:'GET',
      url: '/api/data/'
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    logout: logout,
    getMessage: getMessage
  };
}]);
