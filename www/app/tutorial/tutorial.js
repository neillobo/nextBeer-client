(function() {
  var slides = [{
    title: "your preference...",
    items: ["Swipe right on beers you like or want to try.", "Swipe left on the rest."],
    img: "http://placepuppy.it/150/250",
    imgDesciption: ""
  }, {
    title: "discover beers...",
    items: ["check new recommendations bubbling up.", "see the details"],
    img: "http://placepuppy.it/150/250",
    imgDesciption: ""
  }, {
    title: "collect beers you like...",
    items: ["how to add a beer to myBeer"],
    img: "http://placepuppy.it/150/250",
    imgDesciption: ""
  }, {
    title: "what did we miss?",
    items: ["something..."],
    img: "http://placepuppy.it/150/250",
    imgDesciption: ""
  }];

  angular.module('app.tutorial', [])
    .run(function() {})
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('app.tutorial', {
            url: "/tutorial",
            views: {
              'views': {
                templateUrl: "app/tutorial/tutorial.html",
                controller: "TutorialCtrl"
              }
            }
          });
      }
    ])
    .controller('TutorialCtrl', ['UserFactory', 'UtilFactory', '$scope', '$ionicSlideBoxDelegate',
      function(UserFactory, UtilFactory, $scope, $ionicSlideBoxDelegate) {
        $scope.slides = slides;
        // Called to navigate to the main app
        $scope.isSlideAtEnd = function() {
          return $ionicSlideBoxDelegate.currentIndex() === $ionicSlideBoxDelegate.slidesCount() - 1;
        };
        $scope.isSlideAtBegin = function() {
          return $ionicSlideBoxDelegate.currentIndex() === 0;
        };
        $scope.onComplete = function() {
          UtilFactory.navToDefaultState();
          UserFactory.onCompleteTutorial();
        };
        $scope.next = function() {
          !$scope.isSlideAtEnd() && $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
          !$scope.isSlideAtBegin() && $ionicSlideBoxDelegate.previous();
        };
        $scope.slideChanged = function(index) {
          $scope.slideIndex = index;
          $ionicSlideBoxDelegate.stop();
        };
      }
    ]);
})();
