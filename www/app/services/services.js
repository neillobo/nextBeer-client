angular.module('app.services', [])
.factory('BeerFactory', function($http) {
  var beerQueue = [{
    beer_id: 104,
    beer_name: "Samuel Adams Boston Lager",
    beer_image_url: "./img/samadams.jpg"
  }, {
    beer_id: 754,
    beer_name: "Guinness Draught",
    beer_image_url: "./img/guinness.jpg"
  }, {
    beer_id: 355,
    beer_name: "Dead Guy Ale",
    beer_image_url: "./img/deadguy.jpg"
  }, {
    beer_id: 1904,
    beer_name: "Sierra Nevada Celebration Ale",
    beer_image_url: "./img/sierranevada.jpg"
  }, {
    beer_id: 680,
    beer_name: "Brooklyn Black Chocolate Stout",
    beer_image_url: "./img/blackchocolate.jpg"
  }, {
    beer_id: 1212,
    beer_name: "Blue Moon Belgian White",
    beer_image_url: "./img/bluemoon.jpg"
  }];

  var mySelectedBeers = [];

  var sendRating = function(rObj){
    // var getBeerURL = "http://0.0.0.0:5000/api/v2/"+rObj.beer_id+"/"+rObj.beer_rating+"/"+rObj.user_id;
    // return $http({
    //   method: 'GET',
    //   url: getBeerURL
    //   // data: ratingObject
    // });
  
  return $http({
      method: 'GET',
      url: "http://next-beer.herokuapp.com/api/v1/" + rObj.beer_id
    }).success(function(data,status){
      console.log("Success",data);
    });
  };
  
  var selectedBeer;

  return {
    beerRecQueue: function() {
      return beerQueue;
    },
    myBeers: function() {
      return mySelectedBeers;
    },
    addToQueue: function(beer) {
      beerQueue.push(beer);
    },
    addToMyBeers: function(beer) {
      mySelectedBeers.push(beer);
    },
    sendRating: sendRating,
    showDetails : function(beerIndex){
      return beerQueue[beerIndex];
    },
    getSelectedBeer : function(){
      return selectedBeer;
    },
    setSelectedBeer : function(index){
      selectedBeer = beerQueue[index];
    }
  };
})

.factory('UserFactory', function($http, $window) {
  var userIdGrabber = function() {
    return $http({
      method: 'GET',
      url: 'http://next-beer.herokuapp.com/api/v2/user',
      sucess: function(data){console.log("Sucess!",data)},
      error: function(data){console.log("Error!",data)},
    });
  };
  var setHeader = function(token) {
    // $http.defaults.headers.common.Authorization = 'Bearer' + token;
  };
  return {
    userIdGrabber: userIdGrabber,
    setHeader: setHeader
  };
});
