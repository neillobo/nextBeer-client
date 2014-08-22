angular.module('app.mybeers', [])

.run(function() {

})

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app.mybeers', {
        url: "/mybeers",
        views: {
          'views': {
            templateUrl:"app/mybeers/mybeers.html",
            controller: "MyBeersCtrl"
          }
        }
      });
  }
])

.controller('MyBeersCtrl', ['$scope', 'BeerFactory',
  function($scope, BeerFactory) {
    $scope.myBeers = BeerFactory.getMyBeers();
    $scope.passSelectedBeer = function(beer) {
      /* we can't pass index as the index of mybeers won't be compatible with thebeerRecQue */
      if(!$scope.isEditMode){
      BeerFactory.navToDetail(beer.beer_name);
      }
    };
    $scope.isEditMode = false;
    $scope.toggleEditMode = function(){
      $scope.isEditMode = !$scope.isEditMode;
    };

    $scope.deleteSelectedBeer = function(beer) {
      BeerFactory.removeFromMyBeers(swipedBeer);
    }
  }
]);
