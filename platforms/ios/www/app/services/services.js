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

.service('myBeers', function($rootScope){
	$rootScope.myBeers = [];
})