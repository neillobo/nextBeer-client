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

  $http({
      method: 'GET', 
      url: 'http://nextbeer.herokuapp.com/api/v1/'
    }).
    success(function(data, status, headers, config) {
      console.log(data)
    }).
    error(function(data, status, headers, config) {
      console.log("Error: ",status)
    });
  

  $scope.beerClickEvent = function(item){
    console.log("Item is ",item)
    
    
    $http({
      method: 'POST', 
      url: 'http://www.google.com',
       data: item
    }).
    success(function(data, status, headers, config) {
      console.log(data)
    }).
    error(function(data, status, headers, config) {
      console.log("Error: ",status)
    });
  };
  // $scope.showBeer = ShowBeersFactory.showBeers();
});

