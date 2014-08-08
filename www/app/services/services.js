angular.module('app.services', [])
.factory('BeerFactory', function($http) {
  var beerQueue = [{
    beer_id: 104,
    beer_name: "Samuel Adams Boston Lager",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/104.jpg"
  }, {
    beer_id: 754,
    beer_name: "Guinness Draught",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/754.jpg"
  }, {
    beer_id: 355,
    beer_name: "Dead Guy Ale",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/355.jpg"
  }, {
    beer_id: 1904,
    beer_name: "Sierra Nevada Celebration Ale",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/1904.jpg"
  }, {
    beer_id: 680,
    beer_name: "Brooklyn Black Chocolate Stout",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/680.jpg"
  }, {
    beer_id: 1212,
    beer_name: "Blue Moon Belgian White",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/1212.jpg"
  }];

  var mySelectedBeers = [];

  var sendRating = function(ratingObject){
    return $http({
      method: 'POST',
      url: 'http://next-beer.herokuapp.com/api/v2/beer',
      data: ratingObject
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
      method: 'POST',
      url: 'http://next-beer.herokuapp.com/api/v2/user'
    });
  };
  var setHeader = function(token) {
    $http.defaults.headers.common.Authorization = 'Bearer' + token;
  };
  return {
    userIdGrabber: userIdGrabber,
    setHeader: setHeader
  };
});
