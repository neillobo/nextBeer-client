angular.module('app.detail', [])
.run(function() {
})

.config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.detail', {
          url: "/detail",
          views: {
            'menuContent': {
              templateUrl: "app/detail/detail.html"
            }
          }
        });
    }
  ])

.controller('detailCtrl', ['$scope', 'BeerFactory',
  function($scope, BeerFactory) {
    $scope.beerDetails = BeerFactory.getSelectedBeer();
    $scope.addToMyBeers = function() {
      BeerFactory.addToMyBeers($scope.beerDetails);
    };
  }
]);