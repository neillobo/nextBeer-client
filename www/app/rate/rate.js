angular.module('app.rate', [])

.run(function() {
  
})

.config(function($stateProvider) {
  $stateProvider

    .state('app.rate', {
      url: "/rate",
      views: {
        'menuContent' :{
          templateUrl: "app/rate/rate.html"
        }
      }
    })
})

.controller('RateCtrl',function($scope, $http, $state, $rootScope, ShowBeersFactory){
  
  $scope.items = [{title : "Budweiser", id: 1, img:"./../img/budweiser.jpg"}, {title : "Corona", id: 2, img:"./../img/corona_logo.jpg"},
                  {title : "Stella" , id: 3, img:"./../img/stella_logo.jpg"},{title : "Natty Light" , id:4, img:"./../img/nattylight_logo.jpg"},
                  {title : "Tecate" , id:5, img:"./../img/tecate_logo.jpg"},{title : "PBR" , id: 6, img:"./../img/pbr_logo.jpg"}
                  ];  

//testing simple swipe functionality
// $scope.showBeer = false;

// $scope.doNotLikeBeer = function () {
  
//    $scope.showBeer = !$scope.showBeer;
//    console.log("nope!");
// };

// $scope.likeBeer = function () {
//    $scope.showBeer = !$scope.showBeer;
// };

  $scope.beerClickEvent = function(item){
    console.log("Item is ",item)
    $rootScope.selectedBeer = item;
    $http({
      method: 'GET', 
      url: 'http://127.0.0.1:5000/api/v1/' + item.id
    }).
    success(function(data, status, headers, config) {
      console.log(data)
      $rootScope.recommendedBeer = data.recomendations[0];
      //transition to the next screen and display it
      $state.go('app.recommend');
    }).
    error(function(data, status, headers, config) {
      console.log("Error: ",status)
    });
  };
});

