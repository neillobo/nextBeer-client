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
  
  $http({
      method: 'GET', 
      url: 'http://www.google.com'
    }).
    success(function(data, status, headers, config) {
      console.log(data)
    
    }).
    error(function(data, status, headers, config) {
      console.log("Error: ",status)
        $scope.items = [
        {
          title: 'Corona',
          description : "Great"
        },
        {
          title: 'Budlight',
          description : "Shitty"
        },
        {
          title: 'Blue Moon',
          description : "Meh"
        }];
    });

  $scope.beerClickEvent = function(item){
    console.log("Item is ",item)
    
    delete $http.defaults.headers.common['X-Requested-With'];
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

