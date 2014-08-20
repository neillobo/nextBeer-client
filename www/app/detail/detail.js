angular.module('app.detail', [])
  .run(function() {})

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

.controller('detailCtrl', ['$scope', 'BeerFactory', '$state',
  function($scope, BeerFactory, $state) {
    var beer = BeerFactory.getSelectedBeer();
    if (!beer) {
      // in case, there's nothing to show
      // fall back to recommend view
      // the trainsition is very slow.
      // let's find a faster way to do this
      $state.go('app.recommend');
    }
    $scope.beer = beer;
    $scope.addToMyBeers = function() {
      BeerFactory.addToMyBeers(beer);
      // should give visual feedback to users
      // $state.go('app.recommend');
    };
    $scope.removeFromMyBeers = function() {
      BeerFactory.removeFromMyBeers(beer);
      // should show a pop-up for confirmation
      // $state.go('app.recommend');
    };
  }
]);
