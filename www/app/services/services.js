
angular.module('app.services',['ngCookies'])

.factory('ShowBeersFactory', function(){

	// var showRecBeer = function(beer){
	// 	return beer;
	// 	// console.log(beer);
	// };

	// return {
	// 	showRecBeer : showRecBeer
	// };
})

.factory('BeerService', function(){
	//
	var beerQueue = [{id: 104,name: "Samuel Adams Boston Lager",image_url: "http://cdn.beeradvocate.com/im/beers/104.jpg"},{id: 754,name: "Guinness Draught",image_url: "http://cdn.beeradvocate.com/im/beers/754.jpg"},
                {id: 355,name: "Dead Guy Ale",image_url: "http://cdn.beeradvocate.com/im/beers/355.jpg"},{id: 1904,name: "Sierra Nevada Celebration Ale",image_url:"http://cdn.beeradvocate.com/im/beers/1904.jpg"},
                {id: 680,name: "Brooklyn Black Chocolate Stout", image_url:"http://cdn.beeradvocate.com/im/beers/680.jpg"}, {id:1212,name: "Blue Moon Belgian White",image_url: "http://cdn.beeradvocate.com/im/beers/1212.jpg"}
                ];

  var mySelectedBeers = [];

  return {
  	beerRecQueue: function() {
  		return beerQueue;
  	},
  	myBeers: function() {
  		return mySelectedBeers;
  	},
  	addToQueue: function(beer) {
  		beerQueue.push(beer);
  	},
  	addToMyBeers: function(beer) {
  		mySelectedBeers.push(beer);
  	}
  };
})

.factory('UserFactory', function($http, $window) {
  var userIdGrabber = function() {
    return $http({
      method: 'POST',
      url: 'http://next-beer.herokuapp.com/api/v2/user'
    });
  };
  var setHeader = function(cookie) {
    $http.defaults.headers.common.cookie = cookie;
    $window.document.cookie = cookie;
  };
  return {
    userIdGrabber: userIdGrabber,
    setHeader: setHeader
  };
});
