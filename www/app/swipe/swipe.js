angular.module('app.swipe', [])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider
    .state('app.swipe', {
      url: "/swipe",
      views: {
        'menuContent': {
          templateUrl: "app/swipe/swipe.html"
        }
      }
    });
})

// are we using this?
// .directive('noScroll', function($document) {
//   return {
//     restrict: 'A',
//     link: function($scope, $element, $attr) {
//       $document.on('touchmove', function(e) {
//         e.preventDefault();
//       });
//     }
//   };
// })


.controller('CardsCtrl', function($window, $scope, $ionicSwipeCardDelegate,BeerFactory) {
  // $rootScope.accepted = 0;
  // $rootScope.rejected = 0;

  $scope.cards = BeerFactory.beerRecQueue;

  $scope.addCard = function(newCard) {
    $scope.cards.push(newCard);
  };

  $scope.cardSwiped = function(index) {
  };

  $scope.showDetails = function(index) {
    BeerFactory.setSelectedBeer(index);
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
