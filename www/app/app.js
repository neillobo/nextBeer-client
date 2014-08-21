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
      $urlRouterProvider.otherwise('/app/tutorial');
    }
  ])

.run(['UserFactory', 'UtilFactory', '$rootScope',
  function(UserFactory, UtilFactory, $rootScope) {
    // should probably move to somewhere else.
    // keep here for now for lack of better ideas
    // if (UtilFactory.isTutorialDone()) {
    //   $urlRouterProvider.otherwise('/app/recommend');
    // } else {
    //   UtilFactory.navToTutorial();
    // }

    UtilFactory.enableCordova();
    UserFactory.enableToken();
    UtilFactory.trackPrevState();
  }
]);
