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
