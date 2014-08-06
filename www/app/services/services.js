
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

.factory('BeerService', function(){
	//
	var beerQueue = [{name : "PBR" , id: 6, image_url:"./../img/pbr_logo.jpg"},{name : "Budweiser", id: 1, image_url:"./../img/budweiser.jpg"}, {name : "Corona", id: 2, image_url:"./../img/corona_logo.jpg"},
                {name : "Stella" , id: 3, image_url:"./../img/stella_logo.jpg"},{name : "Natty Light" , id:4, image_url:"./../img/nattylight_logo.jpg"},
                {name : "Tecate" , id: 5, image_url:"./../img/tecate_logo.jpg"}
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
      console.log(beerQueue);
  	},
  	addToMyBeers: function(beer) {
  		mySelectedBeers.push(beer);
  	}
  }
})