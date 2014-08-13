angular.module('app', ['ionic', 'ngTouch', 'app.recommend', 'app.detail', 'app.mybeers', 'app.services', 'app.services.cardswipe'])

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
  if (!$window.localStorage.getItem('Token')) {
    UserFactory.userIdGrabber().then(function(result) {
      console.log("Result from post resquest", result);
      $window.localStorage.setItem('Token', result.data.cookie);
      // UserFactory.setHeader(result.data.token);
    });
  } else {
    // if token already exists, we set the autorization header
    // setHeader doesn't persist so we need to set it every time this app gets run
    UserFactory.setHeader($window.localStorage.getItem('Token'));
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
  $urlRouterProvider.otherwise('/app/recommend');
});
