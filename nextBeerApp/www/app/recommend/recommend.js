angular.module('app.recommend', [])

.run(function() {
  
})

.config(function($stateProvider) {
  $stateProvider

    .state('app.recommend', {
      url: "/recommend",
      views: {
        'menuContent' :{
          templateUrl: "app/recommend/recommend.html"
        }
      }
    })
});

// .controller('RateCtrl',function($scope, ShowBeersFactory){
//   $scope.items = ['A','B','C']
//   $scope.showBeer = ShowBeersFactory.showBeers();
// });