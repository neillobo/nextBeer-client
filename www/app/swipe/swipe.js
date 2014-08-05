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

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate,  $rootScope, myBeers) {
  $rootScope.accepted = 0;
  $rootScope.rejected = 0;

  $rootScope.recommendedBeerQueue = [{title : "Budweiser", id: 1, img:"./../img/budweiser.jpg"}, {title : "Corona", id: 2, img:"./../img/corona_logo.jpg"},
                {title : "Stella" , id: 3, img:"./../img/stella_logo.jpg"},{title : "Natty Light" , id:4, img:"./../img/nattylight_logo.jpg"},
                {title : "Tecate" , id:5, img:"./../img/tecate_logo.jpg"},{title : "PBR" , id: 6, img:"./../img/pbr_logo.jpg"}
                ];  

  $scope.cards = $rootScope.recommendedBeerQueue;

  $scope.cardSwiped = function(index) {
    //need to send post request with rating of -1 or 1 and get new recommendation
    //push new recommendation to end of recommendedBeerQueue
    // $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    if (this.swipeCard.positive === true) {
      $scope.$root.accepted++;
     //do post request to add to user's liked beer queue
     $rootScope.myBeers.push($scope.cards[index]);

    } else {
      $scope.$root.rejected++;
    }
    $scope.cards.splice(index, 1);
    //delete that beer from the recommended beer queue
    $rootScope.recommendedBeerQueue.splice(index, 1);
  };

  $scope.addCard = function() {
    //put card into queue from likes
    var newCard = $rootScope.recommendedBeerQueue[$rootScope.recommendedBeerQueue.length-1];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
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

