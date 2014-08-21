(function() {
  // iife is here to preserve the following config variables
  // change this url—whether prod or local
  var config = {
    baseUrl: 'http://next-beer.herokuapp.com/api/v3',
    defaultState: 'app.recommend'
  };
  // cache the selectedBeer for previous page nav
  var selectedBeer;

  var initTrainingBeers = [{
    trainingId: 1,
    beer_id: 104,
    beer_name: "Samuel Adams Boston Lager",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/104.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"

  }, {
    trainingId: 2,
    beer_id: 754,
    beer_name: "Guinness Draught",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/754.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 3,
    beer_id: 355,
    beer_name: "Dead Guy Ale",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/355.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 4,
    beer_id: 1904,
    beer_name: "Sierra Nevada Celebration Ale",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/1904.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 5,
    beer_id: 680,
    beer_name: "Brooklyn Black Chocolate Stout",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/680.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    trainingId: 6,
    beer_id: 1212,
    beer_name: "Blue Moon Belgian White",
    beer_image_url: "http://cdn.beeradvocate.com/im/beers/1212.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }];

  angular.module('app.services', [])
  // all non-user-specific and beer-specific operations go here
  .factory('BeerFactory', ['$http', '$window', '$state', 'UtilFactory', 'UserFactory',
    function($http, $window, $state, UtilFactory, UserFactory) {
      var trainingBeers = UserFactory.getTrainingBeers();
      var beerRecQueue = trainingBeers;
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

      var getMyBeers = function(beer) {
        return JSON.parse($window.localStorage.getItem('myBeers'));
      };

      var addToMyBeers = function(beer) {
        // currently a user's selected items persist in the local storage
        // but it should eventually persist on the db/server
        // we can only store string typed data in localstorage
        var myBeers = getMyBeers() || {};
        // added a favorite state which's being used in detail view
        beer.isFavorite = true;
        // we use an object to deduplicate the list
        myBeers[beer.beer_name] = beer;
        $window.localStorage.setItem('myBeers', JSON.stringify(myBeers));
      };

      var removeFromMyBeers = function(beer) {
        var myBeers = getMyBeers();
        delete myBeers[beer.beer_name];
        $window.localStorage.setItem('myBeers', JSON.stringify(myBeers));
      };

      // used in detail.js
      var getSelectedBeer = function() {
        return selectedBeer;
      };

      // used in recommend.js
      var navToDetail = function(beerName) {
        // we fetch the metadata from myBeerList
        // the order (mybeer -> beerRecQueue) should be preserved
        // to retrieve correct 'fav' status.
        var myBeers = getMyBeers();
        // caching selectedBeer in the closure scope
        selectedBeer = _.find(myBeers, function(val, key) {
          return key === beerName;
        });
        if (!selectedBeer) {
          selectedBeer = _.find(beerRecQueue, function(beer) {
            return beer.beer_name === beerName;
          });
        }
        // later, we'll want to handle the 2 cases separately for better performance
        $state.go('app.detail');
      };

      return {
        addToQueue: addToQueue,
        addToMyBeers: addToMyBeers,
        beerRecQueue: beerRecQueue,
        getMyBeers: getMyBeers,
        getSelectedBeer: getSelectedBeer,
        removeFromMyBeers: removeFromMyBeers,
        sendRating: sendRating,
        navToDetail: navToDetail
      };
    }
  ])
  // all user-specific operations go here
  .factory('UserFactory', ['$http', '$window', 'UtilFactory',
    function($http, $window, UtilFactory) {
      /**
       * USER TOKEN
       */
      var userTokenGrabber = function() {
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
          userTokenGrabber()
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
      /**
       * INITIAL TRAINING DATA
       * - the dummy data is at top of this script
       * - we shall phase this out once server keeps track of
       * - any beers that users liked or disliked
       * - for now, client keeps track of what training cards were swiped
       */
      var getTrainingBeers = function() {
        return JSON.parse($window.localStorage.getItem('TrainingBeers'));
      };

      var initializeTrainingBeers = function() {
        !!getTrainingBeers() || $window.localStorage.setItem('TrainingBeers', JSON.stringify(initTrainingBeers));
      };

      var updateTrainingBeer = function(swipedTrainingBeer) {
        var TrainingBeers = getTrainingBeers();
        var remainingTrainingBeers = _.filter(TrainingBeers, function(trainingBeer) {
          return trainingBeer.beer_id !== swipedTrainingBeer.beer_id;
        });
        $window.localStorage.setItem('TrainingBeers', JSON.stringify(remainingTrainingBeers));
      };
      initializeTrainingBeers();
      /**
       * TUTORIAL
       */
      var isTutorialDone = function() {
        return $window.localStorage.getItem('FirstLoad') === "false" ? false : true;
      };
      var onCompleteTutorial = function() {
        $window.localStorage.setItem('FirstLoad', "false");
      };
      return {
        enableToken: enableToken,
        getTrainingBeers: getTrainingBeers,
        updateTrainingBeer: updateTrainingBeer,
        isTutorialDone: isTutorialDone,
        onCompleteTutorial: onCompleteTutorial
      };
    }
  ])
  // non-beer, non-user-related operations go here
  .factory('UtilFactory', ['$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$window',
    function($ionicPlatform, $ionicPopup, $rootScope, $state, $window) {
      var errorHandler = function(err) {
        throw err;
      };
      var showConfirmPopUp = function(config, cb) {
        // c.f. http://ionicframework.com/docs/api/service/$ionicPopup/
        $ionicPopup.confirm(config).then(cb).catch(errorHandler);
      };
      var showAlertPopUp = function(config, cb) {
        $ionicPopup.confirm(config).then(cb).catch(errorHandler);
      };
      var navToPrevState = function() {
        $state.go($rootScope.prevState);
      };
      var navToDefaultState = function() {
        $state.go(config.defaultState);
      };
      var navToTutorial = function() {
        $state.go("app.tutorial");
      };
      var trackPrevState = function() {
        // ideally we should use ion-nav-back-button but it's a little tricky to use with for a specific route
        $rootScope.$on('$stateChangeSuccess', function(e, to, toParams, from, fromParams) {
          // we cache the prev state to enable users to go back
          $rootScope.prevState = from.name;
        })
      };
      var enableCordova = function() {
        $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if ($window.cordova && $window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if ($window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }
        });
      };
      return {
        errorHandler: errorHandler,
        enableCordova: enableCordova,
        showConfirmPopUp: showConfirmPopUp,
        showAlertPopUp: showAlertPopUp,
        navToPrevState: navToPrevState,
        navToDefaultState: navToDefaultState,
        navToTutorial: navToTutorial,
        trackPrevState: trackPrevState
      }
    }
  ]);
})();
