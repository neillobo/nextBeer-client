angular.module('app.detail', [])
  .run(function() {})

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app.detail', {
        url: "/detail",
        views: {
          'views': {
            templateUrl: "app/detail/detail.html"
          }
        }
      });
  }
])

.controller('DetailCtrl', ['$scope', 'BeerFactory', 'UtilFactory', '$state',
  function($scope, BeerFactory, UtilFactory, $state) {
    var beer = BeerFactory.getSelectedBeer();
    // if there's nothing to show, no point to transition to detail
    !beer && $state.go('app.recommend');
    $scope.beer = beer;

    $scope.showAlertPopUp = function() {
      var config = {
        title: 'The beer has been added to Favs'
        // template: 'Are you sure you want to remove this?'
      };
      var addToMyBeers = function() {
        BeerFactory.addToMyBeers(beer);
      }
      UtilFactory.showAlertPopUp(config, addToMyBeers);
    };

    // pop up for delete confirmation for an item from myBeer
    $scope.showConfirmPopUp = function() {
      var config = {
        title: 'Remove this from Favs',
        template: 'Are you sure you want to remove this?'
      };
      var removeFromMyBeers = function(isConfirmed) {
        isConfirmed && BeerFactory.removeFromMyBeers(beer);
        // show an 'add to fav' option back again
        // this is not a good practice but we have it for now
        $scope.beer.isFavorite = false;
      };
      UtilFactory.showConfirmPopUp(config, removeFromMyBeers);
    };
  }
]);
