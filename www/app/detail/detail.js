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

.controller('detailCtrl', ['$scope', 'BeerFactory', 'UtilFactory', '$state',
  function($scope, BeerFactory, UtilFactory, $state) {
    var beer = BeerFactory.getSelectedBeer();
    // if there's nothing to show, no point to transition to detail
    !beer && $state.go('app.recommend');
    $scope.beer = beer;

    $scope.addToMyBeers = function() {
      BeerFactory.addToMyBeers(beer);
    };

    // pop up for delete confirmation for an item from myBeer
    var config = {
      title: 'Remove this from Fav',
      template: 'Are you sure you want to delete this?'
    };
    var removeFromMyBeers = function(isConfirmed) {
      isConfirmed && BeerFactory.removeFromMyBeers(beer);
      // show an 'add to fav' option back again
      // this is not a good practice but we have it for now
      $scope.beer.isFavorite = false;
    };
    $scope.showPopUp = function() {
      UtilFactory.showConfirmPopUp(config, removeFromMyBeers);
    }
  }
]);
