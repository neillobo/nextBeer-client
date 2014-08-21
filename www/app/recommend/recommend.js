// app.recommend.swipe is a sub module to app.recommend
angular.module('app.recommend', ['app.recommend.swipe'])

.run(function() {
  // dev logger
  console.log('$$#$#$#$if you do not see any items, it is because you have swiped all items already. to reset, delete items on localstorage on your brwoser console.');
})

.config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('app.recommend', {
        url: "/recommend",
        views: {
          'views': {
            templateUrl: "app/recommend/recommend.html",
            controller: "RecommendCtrl"
          }
        }
      });
  }
])

.controller('RecommendCtrl', ['$window', '$scope', 'BeerFactory', 'UserFactory', 'UtilFactory',
  function($window, $scope, BeerFactory, UserFactory, UtilFactory) {
    var addRecommendedBeer = function(result) {
      var recommendedBeer = result.data;
      $scope.beers.push(recommendedBeer);
    };

    var makeBeerReview = function(index) {
      var rating;
      var swipedBeer = $scope.beers[index];
      if (swipedBeer.trainingId) {
        // swipedBeer === training beer
        // this should be removed once we fetch training set from server
        UserFactory.updateTrainingBeer(swipedBeer);
      }
      if (this.swipeCard && this.swipeCard.positive) {
        rating = 1;
        // take right-swiping as an implicit request
        BeerFactory.addToMyBeers(swipedBeer);
      } else {
        rating = -1;
      }
      return {
        beer_id: swipedBeer.beer_id,
        beer_rating: rating
      };
    };

    $scope.beers = BeerFactory.beerRecQueue;

    $scope.cardSwiped = function(index) {
      var review = makeBeerReview.call(this, index);
      // swipe a beer, you will get recommendation of another beer
      review && BeerFactory.sendRating(review)
        .then(addRecommendedBeer)
        .catch(UtilFactory.errorHandler);
    };

    $scope.cardDestroyed = function(index) {
      $scope.beers.splice(index, 1);
    };

    $scope.passSelectedBeer = function(beer) {
      BeerFactory.navToDetail(beer.beer_name);
    };
  }
]);
