angular.module('app.mybeers', [])

.run(function() {

})

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('app.mybeers', {
      url: "/mybeers",
      views: {
        'menuContent': {
          templateUrl: "app/mybeers/mybeers.html"
        }
      }
    });
}])

.controller('MyBeersCtrl', ['$scope', 'BeerFactory', function($scope, BeerFactory) {
  $scope.myBeers = BeerFactory.getMyBeers();
  $scope.passSelectedBeer = function(index) {
    BeerFactory.passSelectedBeer(index);
  };
}]);
