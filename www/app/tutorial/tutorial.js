angular.module('app.tutorial', [])
  .run(function() {})
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.tutorial', {
          url: "/tutorial",
          views: {
            'menuContent': {
              templateUrl: "app/tutorial/tutorial.html"
            }
          }
        });
    }
  ])
.controller('TutorialCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
  // Called to navigate to the main app
  $scope.isSlideAtEnd = function() {
    return $ionicSlideBoxDelegate.currentIndex() === $ionicSlideBoxDelegate.slidesCount() - 1;
  };
  $scope.isSlideAtBegin = function() {
    return $ionicSlideBoxDelegate.currentIndex() === 0;
  };
  $scope.startApp = function() {
    $state.go('app.recommend');
  };
  $scope.next = function() {
    !$scope.isSlideAtEnd() && $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    !$scope.isSlideAtBegin() && $ionicSlideBoxDelegate.previous();
  };
  $scope.slideChanged = function(index) {
    console.log('index: ', index);
    console.log('begin', $scope.isSlideAtBegin());
    console.log('end', $scope.isSlideAtEnd());
    $scope.slideIndex = index;
  };
});
