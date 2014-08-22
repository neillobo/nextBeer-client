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
     $scope.isEditMode = false;
     $scope.editText = "Remove"

     $scope.passSelectedBeer = function(beer) {
      /* we can't pass index as the index of mybeers won't be compatible with thebeerRecQue */
      if(!$scope.isEditMode){
      BeerFactory.navToDetail(beer.beer_name);

      }
    };
   
    $scope.toggleEditMode = function(){
      $scope.isEditMode = !$scope.isEditMode;
      if($scope.isEditMode){
        $scope.editText = "Done"
      } else {
        $scope.editText = "Edit"
      }
    };

    $scope.deleteSelectedBeer = function(beer) {
      BeerFactory.removeFromMyBeers(beer);
      $scope.myBeers = BeerFactory.getMyBeers();
    }
  }
]);
