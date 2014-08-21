angular.module('app', ['ionic', 'app.tutorial', 'app.recommend', 'app.mybeers', 'app.detail', 'app.services'])

.run(['$ionicPlatform', '$window', 'UserFactory',
  function($ionicPlatform, $window, UserFactory) {
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
    UserFactory.enableToken();
  }
])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "app/app.html"
      });
    // on every first time load, we nav to welcome view
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/recommend');
  }
]);
