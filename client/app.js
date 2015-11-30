angular.module('App', [
  'ui.router',
  'App.home',
  'App.homeFactory',
  'App.signin',
  'App.signinFactory',
  'App.signup',
  'App.signupFactory',
  'App.authFactory'
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider
    .otherwise('/');

  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'signin/signin.html',
      controller: 'signinCtrl',
      controllerAs: 'signinCtrl',
      data: {
        authenticate: false
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'signupCtrl',
      controllerAs: 'signupCtrl',
      data: {
        authenticate: false
      }
    })
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'homeCtrl',
      controllerAs: 'homeCtrl',
      data: {
        authenticate: true
      }
    });

  // intercepts outgoing http request and sets token header
  $httpProvider.interceptors.push(['$window', function($window) {
    return {
      request: function(config) {
        var jwt = $window.localStorage.getItem('authtoken');
        if (jwt) {
          config.headers['x-access-token'] = jwt;
        }
        return config;
      }
    };
  }]);
}])

// on route changes the user authentication status is checked and the user is redirected accordingly
.run(['$rootScope', '$state', 'authFactory', function($rootScope, $state, authFactory) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.data.authenticate && !authFactory.isAuthenticated()) {
      $state.go('signin');
      event.preventDefault();
    }
  });
}]);
