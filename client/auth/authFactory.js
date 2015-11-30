angular.module('App.authFactory', [])

.factory('authFactory', [function() {
  var isAuthenticated = function() {
    return !!window.localStorage.getItem('authtoken');
  };

  return {
    isAuthenticated: isAuthenticated
  };
}]);