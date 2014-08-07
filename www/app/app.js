// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngTouch', 'app.rate', 'app.recommend', 'app.mybeers', 'app.swipe', 'app.services'])

.run(function($ionicPlatform, $window, UserFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  UserFactory.setHeader('K6MY7R1XZT');
  if (!$window.sessionStorage.getItem('Cookie')) {
    UserFactory.userIdGrabber().then(function(result) {
      console.log('session storage is set');
      // UserFactory.setHeader(result.data.cookie);
      $window.sessionStorage.setItem('Cookie', result.data.cookie);
    });
  }
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  // $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app/app.html"
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/swipe');
});
