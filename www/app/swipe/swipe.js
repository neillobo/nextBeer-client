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

//needs to accept card from infinite scroll or first card in rec queue
//swipe right:
// goes to "my beers" queue
//swipe left: 
// gets deleted from rec queue
//skip: stays in queue

.controller('CardsCtrl', function($scope, $timeout, $ionicSwipeCardDelegate, $http, $rootScope, BeerService) {
  $rootScope.accepted = 0;
  $rootScope.rejected = 0;

  $scope.cards = BeerService.beerRecQueue();
  $scope.myBeersView = BeerService.myBeers();

  $scope.getNewBeerFromDB = function(beer){
    $http({
      method: 'GET', 
      url: 'http://127.0.0.1:5000/api/v1/' + beer.id
    }).
    success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log("Error: ", status)
    });
  };

  $scope.addCard = function(newCard) {
    $scope.cards.push(newCard);
  };

  $scope.cardSwiped = function(index) {
    $scope.swipedBeer = $scope.cards[index];
    console.log("swiped:", $scope.swipedBeer);
    $scope.newestBeer = $scope.getNewBeerFromDB(swipedBeer);
    console.log("newestBeer:", $scope.newestBeer);
    //need to send post request with rating of -1 or 1 and get new recommendation
    //push new recommendation to end of recommendedBeerQueue
    $scope.addCard($scope.newestBeer);
  };

  $scope.cardDestroyed = function(index) {
    if (this.swipeCard.positive === true) {
     //do post request to add to user's liked beer queue
     BeerService.addToQueue($scope.cards[index]);

    } else {
    }
    $scope.cards.splice(index, 1);
    //delete that beer from the recommended beer queue
    // $rootScope.recommendedBeerQueue.splice(index, 1);
  };

})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope) {
  $scope.accept = function () {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    $rootScope.accepted++;
    card.swipe(true);
  }
  $scope.reject = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    $rootScope.rejected++;
    card.swipe();
  };
});

