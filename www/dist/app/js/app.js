angular.module('app', ['ionic', 'ngTouch', 'app.recommend', 'app.detail', 'app.mybeers', 'app.services', 'app.services.cardswipe'])

.run(function($ionicPlatform, $window, UserFactory) {
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
  if (!$window.localStorage.getItem('Token')) {
    UserFactory.userIdGrabber().then(function(result) {
      console.log("Result from post resquest", result);
      $window.localStorage.setItem('Token', result.data.cookie);
      // UserFactory.setHeader(result.data.token);
    });
  } else {
    // if token already exists, we set the autorization header
    // setHeader doesn't persist so we need to set it every time this app gets run
    UserFactory.setHeader($window.localStorage.getItem('Token'));
  }
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  // $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app/app.html"
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/recommend');
});

angular.module('app.detail', [])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider
  .state('app.detail', {
    url: "/detail",
    views: {
      'menuContent': {
        templateUrl: "app/detail/detail.html"
      }
    }
  });
})

.controller('detailCtrl', function($scope, $rootScope, BeerFactory) {
  $scope.beerDetails = BeerFactory.getSelectedBeer();
  $scope.addToMyBeers = function() {
    console.log('saving this to my beer', $scope.beerDetails);
    BeerFactory.addToMyBeers($scope.beerDetails);
  };
});

angular.module('app.mybeers', [])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider
    .state('app.mybeers', {
      url: "/mybeers",
      views: {
        'menuContent': {
          templateUrl: "app/mybeers/mybeers.html"
        }
      }
    });
})

.controller('MyBeersCtrl', function($scope, BeerFactory) {
  $scope.myBeers = BeerFactory.getMyBeers();
  $scope.passSelectedBeer = function(index) {
    BeerFactory.passSelectedBeer(index);
  };
});

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
      console.log(window.innerHeight, this.maxHeight);

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
        var rotateTo = (this.rotationAngle + (this.rotationDirection * 0.6)) || (Math.random() * 0.4);
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
      console.log(distance);

      this.touchDistance = distance * 10;

      console.log('Touch distance', this.touchDistance);//this.touchDistance, width);
    },

    _doDrag: function(e) {
      var o = e.gesture.deltaX / 3;
      dragThreshold = Math.abs(o);

      if (dragThreshold > 20) {

        this.rotationAngle = Math.atan(o/this.touchDistance) * this.rotationDirection;

        if(e.gesture.deltaX < 0) {
          this.rotationAngle = 0;
        }

        this.x = this.startX + (e.gesture.deltaX * 0.4);

        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px, ' + this.y  + 'px, 0) rotate(' + (this.rotationAngle || 0) + 'rad)';
      }
    },
    _doDragEnd: function(e) {
      console.log("drag dist", dragThreshold);
      if (dragThreshold > 20) {
        console.log("drag dist", dragThreshold);
        this.transitionOut(e);
      }
    }
  });


  angular.module('app.services.cardswipe', ['ionic'])

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

angular.module('app.recommend', [])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider
    .state('app.recommend', {
      url: "/recommend",
      views: {
        'menuContent': {
          templateUrl: "app/recommend/recommend.html"
        }
      }
    });
})

.controller('CardsCtrl', function($window, $scope, $ionicSwipeCardDelegate,BeerFactory) {

  $scope.cards = BeerFactory.beerRecQueue;

  $scope.addCard = function(newCard) {
    $scope.cards.push(newCard);
  };

  $scope.cardSwiped = function(index) {
  };

  $scope.passSelectedBeer = function(index) {
    BeerFactory.passSelectedBeer(index);
  };

  $scope.cardDestroyed = function(index) {
    var beerRating;
    if (this.swipeCard.positive === true) {
      BeerFactory.addToQueue($scope.cards[index]);
      beerRating = 1;
      BeerFactory.addToMyBeers($scope.cards[index]);
    } else {
      beerRating = -1;
    }

    var swipedBeer = $scope.cards[index];
    var ratingObject = {
      beer_id: swipedBeer.beer_id,
      beer_rating: beerRating,
      user_id: $window.localStorage.getItem('Token')
    };
    BeerFactory.sendRating(ratingObject)
      .then(function(result) {
        $scope.addCard(result.data);
      })
      .catch(function(err) {
        console.log(err);
      });
    $scope.cards.splice(index, 1);
  };
})
