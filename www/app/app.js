angular.module('app', ['ionic', 'app.tutorial', 'app.recommend', 'app.mybeers', 'app.detail', 'app.services'])
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
  ])

.run(['$ionicPlatform', '$window', 'UserFactory', '$rootScope',
  function($ionicPlatform, $window, UserFactory, $rootScope) {
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
    // ideally we should use ion-nav-back-button but it's a little tricky to use with for a specific route
    $rootScope.$on('$stateChangeSuccess', function(e, to, toParams, from, fromParams) {
      // we cache the prev state to enable users to go back
      $rootScope.prevState = from.name;
    })
  }
]);
