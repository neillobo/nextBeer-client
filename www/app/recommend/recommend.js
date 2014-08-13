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
