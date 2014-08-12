angular.module('app.detail', [])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider

    .state('app.detail', {
      url: "/detail",
      views: {
        'menuContent' :{
          templateUrl: "app/beer-detail/beer-detail.html"
        }
      }
    });
})

.controller('detailCtrl',function($scope, $rootScope, BeerFactory){
  	 $scope.beerDetails = BeerFactory.getSelectedBeer();
});