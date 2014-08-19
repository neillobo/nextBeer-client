angular.module('app.detail', [])
.run(function() {
  console.log('hey!!');
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
      console.log('dragon ball!!');
    $scope.beerDetails = BeerFactory.getSelectedBeer();
    $scope.addToMyBeers = function() {
      console.log('saving this to my beer', $scope.beerDetails);
      BeerFactory.addToMyBeers($scope.beerDetails);
    };
  }
]);