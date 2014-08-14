describe('Recommended Ctrl', function() {

    var scope;
    // var BeerFactoryMock;

  // load the controller's module AND the main app module in this order
  beforeEach(module('app'));
  beforeEach(module('app.recommend'));
  beforeEach(inject(function($injector) {
  	BeerFactory = $injector.get('BeerFactory');
  	// swipeCard = $injector.get('swipeCard');
  }))

    // if we decide to use a mock BeerFactory service, define it here:
    // beforeEach(function() {
    //     BeerFactoryMock = {
    //     beerRecQueue: function(){},
	  //     addToQueue: function(){},
	  //     addToMyBeers: function(beer){console.log(beer + " added to local storage!")},
	  //     getMyBeers: function(){},
	  //     sendRating: function(){},
	  //     getSelectedBeer: function(){},
	  //     passSelectedBeer:function(){}
    //    };
    // });

  // inject the required services and instantiate the controller
  beforeEach(inject(function($rootScope, $compile, $controller) {
    scope = $rootScope.$new();
    CardsCtrl = $controller('CardsCtrl', {
        $scope: scope, BeerFactory: BeerFactory
    });
  }));
  it('has a method addCard that adds a card to the cards queue', function () {
  	var newCard = "card";
  	expect(scope.addCard).toBeDefined();
  	expect(typeof scope.addCard).toBe('function');
  	spyon(scope.addCard, newCard);
  	scope.addCard
  	expect(scope.cards).toContain(newCard);
  });
  it('should have a method cardSwiped', function() {
  	expect(scope.cardSwiped).toBeDefined();
  	expect(typeof scope.cardSwiped).toBe('function');
  });
  it('should have a method passSelectedBeer', function() {
  	expect(scope.passSelectedBeer).toBeDefined();
  	expect(typeof scope.passSelectedBeer).toBe('function');
  	//expect BeerFactory.passSelectedBeer to have been called;
  });
   it('should have a method cardDestroyed', function() {
  	expect(scope.cardDestroyed).toBeDefined();
  	expect(typeof scope.cardDestroyed).toBe('function');
  });
  it('uses the BeerFactory method beerRecQueue to get cards', function () {
  	expect(scope.cards.length).not.toBe(0);
  });

	// it('should retrieve user token from local storage', function () {});
});