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

.controller('RateCtrl',function($scope, $http, ShowBeersFactory){
  
  $scope.items = [{title : "Budweiser", img:"./../img/budweiser.jpg"}, {title : "Corona" , img:"./../img/corona_logo.jpg"}];  

  $scope.beerClickEvent = function(item){
    console.log("Item is ",item)
    
    $http({
      method: 'GET', 
      url: 'http://127.0.0.1:5000/api/v1/5'
    }).
    success(function(data, status, headers, config) {
      console.log(data)
      //transition to the next screen and display it
    }).
    error(function(data, status, headers, config) {
      console.log("Error: ",status)
    });
  };
  // $scope.showBeer = ShowBeersFactory.showBeers();
});

