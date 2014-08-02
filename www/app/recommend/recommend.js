angular.module('app.recommend', [])

.run(function() {
  
})

.config(function($stateProvider) {
  $stateProvider

    .state('app.recommend', {
      url: "/recommend",
      views: {
        'menuContent' :{
          templateUrl: "app/recommend/recommend.html"
        }
      }
    })
})

.controller('recommendationCtrl',function($scope, $rootScope, ShowBeersFactory){



  $scope.showBeer = function() {
  	return $rootScope.selectedBeer;
  };
});