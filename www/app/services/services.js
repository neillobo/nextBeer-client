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


    // I guess we don't need this for now
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
      var myBeers = $window.localStorage.getItem('myBeers') || [];
      myBeers.push(beer);
      $window.localStorage.setItem('myBeers', myBeers);
    };
    var getMyBeers = function(beer){
      return $window.localStorage.getItem('myBeers');
    };

    return {
      beerRecQueue: beerRecQueue,
      addToQueue: addToQueue,
      addToMyBeers: addToMyBeers,
      sendRating: sendRating,
      showDetails: function(beerIndex) {
        return beerRecQueue[beerIndex];
      },
      getSelectedBeer: function() {
        return selectedBeer;
      },
      setSelectedBeer: function(index) {
        selectedBeer = beerRecQueue[index];
      }
    };
  })

.factory('UserFactory', function($http, $window) {
  var userIdGrabber = function() {
    return $http({
      method: 'GET',
      url: 'http://next-beer.herokuapp.com/api/v2/user',
      sucess: function(data) {
        console.log("Sucess!", data);
      },
      error: function(data) {
        console.log("Error!", data);
      },
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
