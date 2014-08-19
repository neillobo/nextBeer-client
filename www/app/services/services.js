(function() {
  // iife is here to preserve the following config variables
  // change this url—whether prod or local
  var config = {
    baseUrl: 'http://next-beer.herokuapp.com/api/v2'
  };
  // cache the selectedBeer for previous page nav
  var selectedBeer;

  var tutorialCards = [{
    tutorialId: 1,
    tutorialName: "Welcome to NextBeer, the intelligent beer discovery app!",
    tutorialImgUrl: "./dist/img/beer.png"
  }, {
    tutorialId: 2,
    tutorialName: "Swipe right on beers you like or want to try. Swipe left on the rest!",
    tutorialImgUrl: "./dist/img/swipe-right.png"
  }, {
    tutorialId: 3,
    tutorialName: "Click a beer to see its details , or navigate to My Beers in the side menu to see beers you liked.",
    tutorialImgUrl: "./dist/img/tab.png"
  }];

  var initTrainingSet = [{
    trainingId: 1,
    beer_id: 104,
    beer_name: "Samuel Adams Boston Lager",
    beer_image_url: "./dist/img/samadams.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"

  }, {
    trainingId: 2,
    beer_id: 754,
    beer_name: "Guinness Draught",
    beer_image_url: "./dist/img/guinness.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 3,
    beer_id: 355,
    beer_name: "Dead Guy Ale",
    beer_image_url: "./dist/img/deadguy.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 4,
    beer_id: 1904,
    beer_name: "Sierra Nevada Celebration Ale",
    beer_image_url: "./dist/img/sierranevada.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 5,
    beer_id: 680,
    beer_name: "Brooklyn Black Chocolate Stout",
    beer_image_url: "./dist/img/blackchocolate.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 6,
    beer_id: 1212,
    beer_name: "Blue Moon Belgian White",
    beer_image_url: "./dist/img/bluemoon.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }];

  angular.module('app.services', [])
    .factory('BeerFactory', ['$http', '$window', '$q', '$state', 'UtilFactory', 'UserFactory',
      function($http, $window, $q, $state, UtilFactory, UserFactory) {
        // dummy data === initial training set
        var tutorials = UserFactory.getTutorials();
        var beerRecQueue;
        if (tutorials.length > 0) {
          beerRecQueue = _.union(tutorialCards, initTrainingSet);
        } else {
          beerRecQueue = initTrainingSet;
        }

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
        var passSelectedBeer = function(beerName) {
          // caching this in the closure scope
          selectedBeer = _.find(beerRecQueue, function(beer) {
            return beer.beer_name === beerName;
          });
          $state.go('app.detail');
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

  .factory('UserFactory', ['$http', '$window', 'UtilFactory',
    function($http, $window, UtilFactory) {
      var userIdGrabber = function() {
        return $http({
          method: 'POST',
          url: config.baseUrl + '/user'
        });
      };

      var setHeader = function(token) {
        $http.defaults.headers.common.Authorization = token;
      };

      var enableToken = function() {
        if (!$window.localStorage.getItem('Token')) {
          userIdGrabber()
            .then(function(result) {
              $window.localStorage.setItem('Token', result.data.token);
              setHeader(result.data.token);
            })
            .catch(UtilFactory.errorHandler);
        } else {
          // if token already exists, we set the autorization header
          // setHeader doesn't persist so we need to set it every time this app gets run
          setHeader($window.localStorage.getItem('Token'));
        }
      };

      var getTutorials = function() {
        return JSON.parse($window.localStorage.getItem('Tutorial'));
      };

      var initializeTutorials = function() {
        !!getTutorials() || $window.localStorage.setItem('Tutorial', JSON.stringify(tutorialCards));
      };

      var updateTutorialProgress = function(completedTutorial) {
        console.log(completedTutorial, 'completedTutorial');
        var tutorials = getTutorials();
        var remainingTutorials = _.filter(tutorials, function(tutorial) {
          return tutorial.tutorialId !== completedTutorial.tutorialId;
        });
        $window.localStorage.setItem('Tutorial', JSON.stringify(remainingTutorials));
      };

      // if there's no existing tutorial in localstorage, we initialize with the complete tutorial cards
      // this will be run when this factory gets instantiated
      initializeTutorials();

      return {
        enableToken: enableToken,
        getTutorials: getTutorials,
        updateTutorialProgress: updateTutorialProgress
      };
    }
  ])
    .factory('UtilFactory', [

      function() {
        var errorHandler = function(err) {
          console.log("following error happened");
          throw err;
        };
        return {
          errorHandler: errorHandler
        }
      }
    ]);
})();
