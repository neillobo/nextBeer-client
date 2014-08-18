angular.module('app.detail', [])
.run(function() {

})

.config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('app.detail', {
          url: "/detail",
          views: {
            'menuContent': {
              templateUrl: "app/detail/detail.html"
            }
          }
        });
    }
  ])

.controller('detailCtrl', ['$scope', 'BeerFactory',
  function($scope, BeerFactory) {
    $scope.beerDetails = BeerFactory.getSelectedBeer() || {
          beer_id: 104,
          beer_name: "Samuel Adams Boston Lager",
          // beer_image_url: "./dist/img/samadams.jpg",
          beer_image_url: "http://cdn.beeradvocate.com/im/beers/11757.jpg",
          beer_abv: 3,
          beer_style: 'IPA'
        };
    $scope.addToMyBeers = function() {
      console.log('saving this to my beer', $scope.beerDetails);
      BeerFactory.addToMyBeers($scope.beerDetails);
    };
  }
]);