(function(){
  // iife is here to preserve the following config variables
  // change this url—whether prod or local
  var config = {
    baseUrl : 'http://next-beer.herokuapp.com/api/v2'
  };
  // cache the selectedBeer for previous page nav
  var selectedBeer;

  angular.module('app.services', [])
    .factory('BeerFactory', ['$http', '$window',
      function($http, $window) {
        // dummy data === initial training set
        var beerRecQueue = [{
          beer_id: 104,
          beer_name: "Samuel Adams Boston Lager",
          beer_image_url: "./dist/img/samadams.jpg"
        }, {
          beer_id: 754,
          beer_name: "Guinness Draught",
          beer_image_url: "./dist/img/guinness.jpg"
        }, {
          beer_id: 355,
          beer_name: "Dead Guy Ale",
          beer_image_url: "./dist/img/deadguy.jpg"
        }, {
          beer_id: 1904,
          beer_name: "Sierra Nevada Celebration Ale",
          beer_image_url: "./dist/img/sierranevada.jpg"
        }, {
          beer_id: 680,
          beer_name: "Brooklyn Black Chocolate Stout",
          beer_image_url: "./dist/img/blackchocolate.jpg"
        }, {
          beer_id: 1212,
          beer_name: "Blue Moon Belgian White",
          beer_image_url: "./dist/img/bluemoon.jpg"
        }];

        // this should be changed to POST
        var sendRating = function(beerReview) {
          return $http({
            method: 'POST',
            url: config.baseUrl + "/rate",
            data: beerReview
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

        // used in detail.js
        var getSelectedBeer = function() {
          return selectedBeer;
        };
        // used in recommend.js
        var passSelectedBeer = function(index) {
          // caching this in the closure scope
          console.log(beerRecQueue[index]);
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
      }
    ])

  .factory('UserFactory', ['$http', '$window',
    function($http, $window) {
      var userIdGrabber = function() {
        return $http({
          method: 'POST',
          url: config.baseUrl + '/user'
        }).catch(function(err) {
          console.log(err);
        });
      };
      var setHeader = function(token) {
        $http.defaults.headers.common.Authorization = token;
      };
      return {
        userIdGrabber: userIdGrabber,
        setHeader: setHeader
      };
    }
  ]);
})();
