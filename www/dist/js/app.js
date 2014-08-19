angular.module('app', ['ionic', 'app.recommend', 'app.detail', 'app.mybeers', 'app.services'])

.run(['$ionicPlatform', '$window', 'UserFactory',
  function($ionicPlatform, $window, UserFactory) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    UserFactory.enableToken();
  }
])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "app/app.html"
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/recommend');
  }
]);

angular.module('app.detail', [])
.run(function() {
  console.log('hey!!');
})

.config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.detail', {
          url: "/detail",
          views: {
            'menuContent': {
              templateUrl: "app/detail/detail.html"
            }
          }
        });
    }
  ])

.controller('detailCtrl', ['$scope', 'BeerFactory',
  function($scope, BeerFactory) {
      console.log('dragon ball!!');
    $scope.beerDetails = BeerFactory.getSelectedBeer();
    $scope.addToMyBeers = function() {
      console.log('saving this to my beer', $scope.beerDetails);
      BeerFactory.addToMyBeers($scope.beerDetails);
    };
  }
]);
angular.module('app.mybeers', [])

.run(function() {

})

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('app.mybeers', {
      url: "/mybeers",
      views: {
        'menuContent': {
          templateUrl: "app/mybeers/mybeers.html"
        }
      }
    });
}])

.controller('MyBeersCtrl', ['$scope', 'BeerFactory', function($scope, BeerFactory) {
  $scope.myBeers = BeerFactory.getMyBeers();
  $scope.passSelectedBeer = function(index) {
    console.log(index);
    BeerFactory.passSelectedBeer(index);
  };
}]);

// app.recommend.swipe is a sub module to app.recommend
angular.module('app.recommend', ['app.recommend.swipe'])

.run(function() {

})

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app.recommend', {
        url: "/recommend",
        views: {
          'menuContent': {
            templateUrl: "app/recommend/recommend.html"
          }
        }
      });
  }
])

.controller('CardsCtrl', ['$window', '$scope', 'BeerFactory',
  function($window, $scope, BeerFactory) {

    $scope.beers = BeerFactory.beerRecQueue;
    // default rating
    var beerRating = 0;
    var addCard = function(result) {
      var recommendedBeer = result.data;
      $scope.beers.push(recommendedBeer);
    };

    $scope.cardSwiped = function(index) {
      if (this.swipeCard && this.swipeCard.positive) {
        // why do we send this back to the queue?
        // BeerFactory.addToQueue($scope.beers[index]);
        beerRating = 1;
        // explicity preference, therefore put into mybeer
        BeerFactory.addToMyBeers($scope.beers[index]);
      } else {
        beerRating = -1;
      }
      var swipedBeer = $scope.beers[index];
      var beerReview = {
        beer_id: swipedBeer.beer_id,
        beer_rating: beerRating
      };
      // swipe a beer, you will get recommendation of another beer
      BeerFactory.sendRating(beerReview)
        .then(addCard)
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.cardDestroyed = function(index) {
      $scope.beers.splice(index, 1);
    };

    $scope.passSelectedBeer = function(index) {
      // on click event, we send the selected beer
      // to service.js to show details of that beer
      BeerFactory.passSelectedBeer(index);
    };
  }
]);


(function() {
  // iife is here to preserve the following config variables
  // change this url—whether prod or local
  var config = {
    baseUrl: 'http://next-beer.herokuapp.com/api/v2'
  };
  // cache the selectedBeer for previous page nav
  var selectedBeer;

  var tutorialCards = [{
    beer_name: "Welcome to NextBeer, the intelligent beer discovery app!",
    beer_image_url: "./dist/img/beer.png"
  }, {
    beer_name: "Swipe right on beers you like or want to try. Swipe left on the rest!",
    beer_image_url: "./dist/img/swipe-right.png"
  }, {
    beer_name: "Click a beer to see its details , or navigate to My Beers in the side menu to see beers you liked.",
    beer_image_url: "./dist/img/tab.png"
  }];

  var initTrainingSet = [{
    beer_id: 104,
    beer_name: "Samuel Adams Boston Lager",
    beer_image_url: "./dist/img/samadams.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"

  }, {
    beer_id: 754,
    beer_name: "Guinness Draught",
    beer_image_url: "./dist/img/guinness.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    beer_id: 355,
    beer_name: "Dead Guy Ale",
    beer_image_url: "./dist/img/deadguy.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    beer_id: 1904,
    beer_name: "Sierra Nevada Celebration Ale",
    beer_image_url: "./dist/img/sierranevada.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    beer_id: 680,
    beer_name: "Brooklyn Black Chocolate Stout",
    beer_image_url: "./dist/img/blackchocolate.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }, {
    beer_id: 1212,
    beer_name: "Blue Moon Belgian White",
    beer_image_url: "./dist/img/bluemoon.jpg",
    beer_style: "dragon ball",
    beer_abv: "3"
  }];

  angular.module('app.services', [])
    .factory('BeerFactory', ['$http', '$window', '$q', '$state', 'UtilFactory',
      function($http, $window, $q, $state, UtilFactory) {
        // dummy data === initial training set

        var beerRecQueue = _.union(tutorialCards, initTrainingSet);
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

      return {
        enableToken: enableToken
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

/* jshint -W004 */
(function(ionic) {
  // Get transform origin poly
  var d = document.createElement('div');
  var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
              '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'];

  var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
  for(var i = 0; i < transformKeys.length; i++) {
    if(d.style[transformKeys[i]] !== undefined) {
      TRANSFORM_ORIGIN = transformKeys[i];
      break;
    }
  }

  var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
              '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'];
  var TRANSITION = 'webkitTransition';
  for(var i = 0; i < transitionKeys.length; i++) {
    if(d.style[transitionKeys[i]] !== undefined) {
      TRANSITION = transitionKeys[i];
      break;
    }
  }

  var SwipeableCardController = ionic.controllers.ViewController.inherit({
    initialize: function(opts) {
      this.cards = [];

      var ratio = window.innerWidth / window.innerHeight;

      this.maxWidth = window.innerWidth - (opts.cardGutterWidth || 0);
      this.maxHeight = opts.height || 300;
      this.cardGutterWidth = opts.cardGutterWidth || 10;
      this.cardPopInDuration = opts.cardPopInDuration || 400;
      this.cardAnimation = opts.cardAnimation || 'pop-in';
    },
    /**
     * Push a new card onto the stack.
     */
    pushCard: function(card) {
      var self = this;

      this.cards.push(card);
      this.beforeCardShow(card);

      card.transitionIn(this.cardAnimation);
      setTimeout(function() {
        card.disableTransition(self.cardAnimation);
      }, this.cardPopInDuration + 100);
    },
    /**
     * Set up a new card before it shows.
     */
    beforeCardShow: function() {
      var nextCard = this.cards[this.cards.length-1];
      if(!nextCard) return;

      // Calculate the top left of a default card, as a translated pos
      var topLeft = window.innerHeight / 2 - this.maxHeight/2;
      // console.log(window.innerHeight, this.maxHeight);

      var cardOffset = Math.min(this.cards.length, 3) * 5;

      // Move each card 5 pixels down to give a nice stacking effect (max of 3 stacked)
      nextCard.setPopInDuration(this.cardPopInDuration);
      nextCard.setZIndex(this.cards.length);
    },
    /**
     * Pop a card from the stack
     */
    popCard: function(animate) {
      var card = this.cards.shift();
      if(animate) {
        card.swipe();
      }
      return card;
    }
  });

  var SwipeableCardView = ionic.views.View.inherit({
    /**
     * Initialize a card with the given options.
     */
    initialize: function(opts) {
      opts = ionic.extend({
      }, opts);

      ionic.extend(this, opts);

      this.el = opts.el;

      this.startX = this.startY = this.x = this.y = 0;

      this.bindEvents();
    },

    /**
     * Set the X position of the card.
     */
    setX: function(x) {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + x + 'px,' + this.y + 'px, 0)';
      this.x = x;
      this.startX = x;
    },

    /**
     * Set the Y position of the card.
     */
    setY: function(y) {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px,' + y + 'px, 0)';
      this.y = y;
      this.startY = y;
    },

    /**
     * Set the Z-Index of the card
     */
    setZIndex: function(index) {
      this.el.style.zIndex = index;
    },

    /**
     * Set the width of the card
     */
    setWidth: function(width) {
      this.el.style.width = width + 'px';
    },

    /**
     * Set the height of the card
     */
    setHeight: function(height) {
      this.el.style.height = height + 'px';
    },

    /**
     * Set the duration to run the pop-in animation
     */
    setPopInDuration: function(duration) {
      this.cardPopInDuration = duration;
    },

    /**
     * Transition in the card with the given animation class
     */
    transitionIn: function(animationClass) {
      var self = this;

      this.el.classList.add(animationClass + '-start');
      this.el.classList.add(animationClass);
      this.el.style.display = 'block';
      setTimeout(function() {
        self.el.classList.remove(animationClass + '-start');
      }, 100);
    },

    /**
     * Disable transitions on the card (for when dragging)
     */
    disableTransition: function(animationClass) {
      this.el.classList.remove(animationClass);
    },

    /**
     * Swipe a card out programtically
     */
    swipe: function(positive) {
      this.transitionOut(positive);
    },

    transitionOut: function(positive) {
      var self = this;
      if((positive === true) || (this.x > 0)) {
        // Fly right
        var rotateTo = (this.rotationAngle + (this.rotationDirection * 0.6)) || (Math.random() * -0.4);
        var duration = this.rotationAngle ? 0.2 : 0.5;
        this.el.style[TRANSITION] = '-webkit-transform ' + duration + 's ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + (window.innerWidth * 1.5) + 'px,' + this.y + 'px, 0) rotate(' + rotateTo + 'rad)';
        this.onSwipe && this.onSwipe();

        self.positive = true;
        // Trigger destroy after card has swiped out
        setTimeout(function() {
          self.onDestroy && self.onDestroy(true);
        }, duration * 1000);
      } else {
        // Fly left
        console.log(this.rotationAngle, 'angle');
        console.log(this.rotationDirection, 'direction');
        console.log(this.rotationAngle + (this.rotationDirection * 0.6), 'result');
        var rotateTo = -(this.rotationAngle + (this.rotationDirection * 0.6)) || (Math.random() * 0.4);
        var duration = this.rotationAngle ? 0.2 : 0.5;
        this.el.style[TRANSITION] = '-webkit-transform ' + duration + 's ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + (window.innerWidth * -1.5) + 'px,' + this.y + 'px, 0) rotate(' + rotateTo + 'rad)';
        this.onSwipe && this.onSwipe();

        self.positive = false;
        // Trigger destroy after card has swiped out
        setTimeout(function() {
          self.onDestroy && self.onDestroy();
        }, duration * 1000);
      }
    },

    dragThreshold: 0,

    /**
     * Bind drag events on the card.
     */
    bindEvents: function() {
      var self = this;
      ionic.onGesture('dragstart', function(e) {
        var cx = window.innerWidth / 2;
        if(e.gesture.touches[0].pageX < cx) {
          self._transformOriginRight();
        } else {
          self._transformOriginLeft();
        }
        window._rAF(function() { self._doDragStart(e) });
      }, this.el);

      ionic.onGesture('drag', function(e) {
        window._rAF(function() { self._doDrag(e) });
      }, this.el);

      ionic.onGesture('dragend', function(e) {
        window._rAF(function() { self._doDragEnd(e) });
      }, this.el);
    },

    // Rotate anchored to the left of the screen
    _transformOriginLeft: function() {
      this.el.style[TRANSFORM_ORIGIN] = 'left center';
      this.rotationDirection = 1;
    },

    _transformOriginRight: function() {
      this.el.style[TRANSFORM_ORIGIN] = 'right center';
      this.rotationDirection = -1;
    },

    _doDragStart: function(e) {
      var width = this.el.offsetWidth;
      var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
      var distance = Math.abs(point - e.gesture.touches[0].pageY);// - window.innerWidth/2);
      // console.log(distance);

      this.touchDistance = distance * 10;

      // console.log('Touch distance', this.touchDistance);//this.touchDistance, width);
    },

    _doDrag: function(e) {
      var o = e.gesture.deltaX / 3;
      dragThreshold = Math.abs(o);

        this.rotationAngle = Math.atan(o/this.touchDistance) * this.rotationDirection;

        if(e.gesture.deltaX < 0) {
          this.rotationAngle = 0;
        }

        this.x = this.startX + (e.gesture.deltaX * 0.4);

        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px, ' + this.y  + 'px, 0) rotate(' + (this.rotationAngle || 0) + 'rad)';
    },

    _doDragEnd: function(e) {
      // console.log("drag dist", dragThreshold);
      if (dragThreshold > 60) {
        this.transitionOut(e);
        //snap back if not dragged far enough
      } else {
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.startX + 'px, ' + this.startY  + 'px, 0) rotate(' + (0) + 'rad)';
      }
    }
  });


  angular.module('app.recommend.swipe', ['ionic'])

  .directive('swipeCard', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      template: '<div class="swipe-card" ng-transclude></div>',
      require: '^swipeCards',
      replace: true,
      transclude: true,
      scope: {
        onSwipe: '&',
        onDestroy: '&'
      },
      compile: function(element, attr) {
        return function($scope, $element, $attr, swipeCards) {
          var el = $element[0];

          // Instantiate our card view
          var swipeableCard = new SwipeableCardView({
            el: el,
            onSwipe: function() {
              $timeout(function() {
                $scope.onSwipe();
              });
            },
            onDestroy: function() {
              $timeout(function() {
                $scope.onDestroy();
                $element.remove();
              });
            },
          });
          $scope.$parent.swipeCard = swipeableCard;

          swipeCards.pushCard(swipeableCard);

        }
      }
    }
  }])

  .directive('swipeCards', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      template: '<div class="swipe-cards" ng-transclude></div>',
      replace: true,
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var swipeController = new SwipeableCardController({
        });
        $rootScope.$on('swipeCard.pop', function(isAnimated) {
          swipeController.popCard(isAnimated);
        });

        return swipeController;
      }
    }
  }])

  .factory('$ionicSwipeCardDelegate', ['$rootScope', function($rootScope) {
    return {
      popCard: function($scope, isAnimated) {
        $rootScope.$emit('swipeCard.pop', isAnimated);
      },
      getSwipebleCard: function($scope) {
        return $scope.$parent.swipeCard;
      }
    }
  }]);

})(window.ionic);