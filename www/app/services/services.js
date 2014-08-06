
angular.module('app.services',[])

.factory('ShowBeersFactory', function(){

	// var showRecBeer = function(beer){
	// 	return beer;
	// 	// console.log(beer);
	// };

	// return {
	// 	showRecBeer : showRecBeer
	// };
})

.service('BeerService', function($rootScope, $scope){
	//
	var beerQueue = [{name : "Budweiser", id: 1, url:"./../img/budweiser.jpg"}, {name : "Corona", id: 2, url:"./../img/corona_logo.jpg"},
                {name : "Stella" , id: 3, url:"./../img/stella_logo.jpg"},{name : "Natty Light" , id:4, url:"./../img/nattylight_logo.jpg"},
                {name : "Tecate" , id: 5, url:"./../img/tecate_logo.jpg"},{name : "PBR" , id: 6, url:"./../img/pbr_logo.jpg"}
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
  }
})