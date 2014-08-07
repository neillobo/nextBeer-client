angular.module('app.swipe', ['ionic', 'ngTouch', 'ionic.contrib.ui.cards'])

.run(function() {

})

.config(function($stateProvider) {
  $stateProvider
    .state('app.swipe', {
      url: "/swipe",
      views: {
        'menuContent' :{
          templateUrl: "app/swipe/swipe.html"
        }
      }
    });
})

.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
})


.controller('CardsCtrl', function($scope, $timeout, $ionicSwipeCardDelegate, $http, $rootScope, BeerFactory) {
  $rootScope.accepted = 0;
  $rootScope.rejected = 0;

  $scope.cards = BeerFactory.beerRecQueue();
  $scope.myBeersView = BeerFactory.myBeers();


  $scope.addCard = function(newCard) {
    $scope.cards.push(newCard);
  };

  $scope.cardSwiped = function(index) {
    // var swipedBeer = $scope.cards[index];
    // var ratingObject = {beer_id: swipedBeer.beer_id, beer_rating: 1}
    // BeerFactory.sendRating($scope.swipedBeer)
    // .then(function(result){
    //   $scope.addCard(result.data);
    // })
    // .catch(function(err){
    //   console.log(err);
    // });
  };

  $scope.cardDestroyed = function(index) {
    if (this.swipeCard.positive === true) {
     BeerFactory.addToQueue($scope.cards[index]);
     var beerRating = 1;
    } else {
      var beerRating = -1;
    }

    var swipedBeer = $scope.cards[index];
    var ratingObject = {beer_id: swipedBeer.beer_id, beer_rating: beerRating}
    BeerFactory.sendRating(ratingObject)
    .then(function(result){
      $scope.addCard(result.data);
    })
    .catch(function(err){
      console.log(err);
    });
    $scope.cards.splice(index, 1);
  };
})

