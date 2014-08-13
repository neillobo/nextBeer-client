angular.module('app.services', [])
  .factory('BeerFactory', function($http, $window) {
    var beerRecQueue = [{
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

    // this should be changed to POST
    var sendRating = function(rObj) {
      return $http({
        method: 'GET',
        url: "http://next-beer.herokuapp.com/api/v1/" + rObj.beer_id
      }).success(function(data, status) {
        console.log("Success", data);
      });
    };

    var addToQueue = function(beer) {
      beerRecQueue.push(beer);
    };

    var addToMyBeers = function(beer) {
      // currently a user's selected items persist in the local storage
      // but it should eventually persist on the db/server
      // we can only store string typed data in localstorage
      var myBeers = JSON.parse($window.localStorage.getItem('myBeers')) || {};
      // we use an object to deduplicate the list
      myBeers[beer.beer_name] = beer;
      $window.localStorage.setItem('myBeers', JSON.stringify(myBeers));
    };

    var getMyBeers = function(beer) {
      return JSON.parse($window.localStorage.getItem('myBeers'));
    };

    var getSelectedBeer = function() {
      return selectedBeer;
    };

    var passSelectedBeer = function(index) {
      selectedBeer = beerRecQueue[index];
    };

    return {
      beerRecQueue: beerRecQueue,
      addToQueue: addToQueue,
      addToMyBeers: addToMyBeers,
      getMyBeers: getMyBeers,
      sendRating: sendRating,
      getSelectedBeer: getSelectedBeer,
      passSelectedBeer: passSelectedBeer
    };
  })

.factory('UserFactory', function($http, $window) {
  var userIdGrabber = function() {
    return $http({
      method: 'GET',
      url: 'http://next-beer.herokuapp.com/api/v2/user',
      sucess: function(data) {
        console.log("Success!", data);
      },
      error: function(data) {
        console.log("Error!", data);
      },
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
