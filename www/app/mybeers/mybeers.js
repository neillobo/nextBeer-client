angular.module('app.mybeers', [])

.run(function() {
  
})

.config(function($stateProvider) {
  $stateProvider

    .state('app.mybeers', {
      url: "/mybeers",
      views: {
        'menuContent' :{
          templateUrl: "app/mybeers/mybeers.html"
        }
      }
    })
})

.controller('MyBeersCtrl', function($scope, $rootScope){



  console.log("mybeers:", $rootScope.myBeers);
  // $scope.showBeer = function() {
  // 	return $rootScope.selectedBeer;
  // };
  
});