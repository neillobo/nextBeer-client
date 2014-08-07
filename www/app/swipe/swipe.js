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
    })
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})


.controller('CardsCtrl', function($scope, $timeout, $ionicSwipeCardDelegate, $http, $rootScope, BeerService) {
  $rootScope.accepted = 0;
  $rootScope.rejected = 0;

  $scope.cards = BeerService.beerRecQueue();
  $scope.myBeersView = BeerService.myBeers();

  $scope.getNewBeerFromDB = function(beer){
    return $http({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/' + beer.id
    });
  };

  $scope.addCard = function(newCard) {
    $scope.cards.push(newCard);
  };

  $scope.cardSwiped = function(index) {
    $scope.swipedBeer = $scope.cards[index];
    $scope.getNewBeerFromDB($scope.swipedBeer)
    .then(function(result){
      $scope.addCard(result.data);
    })
    .catch(function(err){
      console.log(err);
    });
  };

  $scope.cardDestroyed = function(index) {
    if (this.swipeCard.positive === true) {
     BeerService.addToQueue($scope.cards[index]);
    }
    $scope.cards.splice(index, 1);
  };
})

