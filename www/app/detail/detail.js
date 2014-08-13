angular.module('app.detail', [])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider
  .state('app.detail', {
    url: "/detail",
    views: {
      'menuContent': {
        templateUrl: "app/detail/detail.html"
      }
    }
  });
})

.controller('detailCtrl', function($scope, $rootScope, BeerFactory) {
  $scope.beerDetails = BeerFactory.getSelectedBeer();
  $scope.addToMyBeers = function() {
    console.log('saving this to my beer', $scope.beerDetails);
    BeerFactory.addToMyBeers($scope.beerDetails);
  };
});
