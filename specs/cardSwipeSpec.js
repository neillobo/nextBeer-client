  //code below seems more like directive testing
  it('sends a rating to the server', function () {
		  // var beer = {beer: "beerName"}
		  var swipeCard = {positive: true};
		  var index = 7;
      spyOn(BeerFactory, 'addToMyBeers').andCallThrough();
      scope.cardDestroyed(index);
      expect(BeerFactory.addToMyBeers).toHaveBeenCalled();
  });