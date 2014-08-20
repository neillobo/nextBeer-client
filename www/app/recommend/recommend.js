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

.controller('CardsCtrl', ['$window', '$scope', 'BeerFactory', 'UserFactory', 'UtilFactory',
  function($window, $scope, BeerFactory, UserFactory, UtilFactory) {
    var addRecommendedBeer = function(result) {
      var recommendedBeer = result.data;
      $scope.beers.push(recommendedBeer);
    };

    var makeBeerReview = function(index) {
      var rating;
      var swipedBeer = $scope.beers[index];
      if (swipedBeer.tutorialId) {
        // swipedBeer === tutorial
        UserFactory.updateTutorialProgress(swipedBeer);
        return null;
      }
      if (swipedBeer.trainingId){
        // swipedBeer === training beer
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
      if (review) {
        // only make a request if it's not a tutorial
        // swipe a beer, you will get recommendation of another beer
        BeerFactory.sendRating(review)
          .then(addRecommendedBeer)
          .catch(UtilFactory.errorHandler);
      }
    };

    $scope.cardDestroyed = function(index) {
      $scope.beers.splice(index, 1);
    };

    $scope.passSelectedBeer = function(beer) {
      // we can't pass index as the index of mybeers
      // won't be compatible with thebeerRecQue
      // handle the  tutorial edge case
      !beer.tutorialId && BeerFactory.navToDetail(beer.beer_name);
    };
  }
]);
