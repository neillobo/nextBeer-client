angular.module('app.services',[

])

.factory('ShowBeersFactory', function(){

	var showBeers = function(){
		return "Beers!!!"
	}

	return {
		showBeers : showBeers
	};
})