angular.module('app.tutorial', [])
  .run(function() {})

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app.tutorial', {
        url: "/tutorial",
        views: {
          'menuContent': {
            templateUrl: "app/tutorial/tutorial.html"
          }
        }
      });
  }
])

.controller('TutorialCtrl', [function(){

}]);