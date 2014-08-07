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
  
  $scope.items = [{id: 104,name:"Samuel Adams Boston Lager",image_url: "http://cdn.beeradvocate.com/im/beers/104.jpg"}, {id:1212,name: "Blue Moon Belgian White",image_url:"http://cdn.beeradvocate.com/im/beers/1212.jpg"},
                  {id: 1904,name: "Sierra Nevada Celebration Ale",image_url: "http://cdn.beeradvocate.com/im/beers/1904.jpg"},{id: 754,name:"Guinness Draught",image_url: "http://cdn.beeradvocate.com/im/beers/754.jpg"},
                  {id: 276,name: "Sierra Nevada Pale Ale",image_url:"http://cdn.beeradvocate.com/im/beers/276.jpg"},{id: 7971,name: "Pliny The Elder",image_url: "http://cdn.beeradvocate.com/im/beers/7971.jpg"}, 
                  {id:680,name: "Brooklyn Black Chocolate Stout",image_url:"http://cdn.beeradvocate.com/im/beers/680.jpg"}
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

