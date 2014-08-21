angular.module('app.detail', [])
  .run(function() {})

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app.detail', {
        url: "/detail",
        views: {
          'views': {
            templateUrl: "app/detail/detail.html",
            controller: "DetailCtrl"
          }
        }
      });
  }
])

.controller('DetailCtrl', ['$scope', 'BeerFactory', 'UtilFactory',
  function($scope, BeerFactory, UtilFactory) {
    var beer = BeerFactory.getSelectedBeer();
    // if there's nothing to show, no point to transition to detail
    !beer && UtilFactory.navToDefaultState();
    $scope.beer = beer;

    $scope.showAlertPopUp = function() {
      var config = {
        title: 'The beer has been added to Favs',
        cancelType: 'make-invisible',
        okType: "button-energized"
      };
      var addToMyBeers = function() {
        BeerFactory.addToMyBeers(beer);
        UtilFactory.navToPrevState();
      };
      UtilFactory.showAlertPopUp(config, addToMyBeers);
    };

    // pop up for delete confirmation for an item from myBeer
    $scope.showConfirmPopUp = function() {
      var config = {
        title: "Remove this from Favs",
        template: "<p>Are you sure you want to remove this?</p>",
        cancelText: "Cancel",
        okText: "Remove",
        okType: "button-assertive"
      };
      var removeFromMyBeers = function(isConfirmed) {
        isConfirmed && BeerFactory.removeFromMyBeers(beer);
        UtilFactory.navToPrevState();
      };
      UtilFactory.showConfirmPopUp(config, removeFromMyBeers);
    };
    $scope.navToPrev = UtilFactory.navToPrevState;
  }
]);
