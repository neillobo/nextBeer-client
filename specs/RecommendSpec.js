describe('Recommended Ctrl', function() {

    var $scope, $state;

  // load the controller's module AND the main app module in this order
  beforeEach(module('ui.router'));
  beforeEach(module('app'));
  beforeEach(module('app.recommend'));
  beforeEach(inject(function($injector, $state) {
    BeerFactory = $injector.get('BeerFactory');
    $state = $injector.get('$state');
  }));

  // inject the required services and instantiate the controller
  beforeEach(inject(function($_rootScope_, _$controller_) {
    $scope = $_rootScope_.$new();
    CardsCtrl = _$controller_('CardsCtrl', {
        $scope: $scope, BeerFactory: BeerFactory
    });
  }));

  it('should have /recommend state, template, and controller', function() {
    expect($state.includes['app.recommend']).toBe(true);
    expect($state.current['app.recommend'].controller).to.be('CardsCtrl');
    expect($state.current['app.recommend'].templateUrl).to.be('app/recommend/recommend.html');
  });
  it('should have a method addCard', function () {
  	expect(typeof $scope.addCard).toBe('function');
  });
  it('should add a beer to $scope.beers when the addCard method is called', function() {
    var newBeer = {data: 'beerName'};
    $scope.addCard(newBeer);
    expect($scope.addCard).toHaveBeenCalled();
    expect($scope.beers).toContain(newBeer);
  });
  it('should have a method cardSwiped', function() {
  	expect($scope.cardSwiped).toBeDefined();
  	expect(typeof $scope.cardSwiped).toBe('function');
  });
  it('should call the BeerFactory\'s addToMyBeers method when cardSwiped is called', function() {
    var beerObj = {beer: 'name'};
    spyOn(BeerFactory, 'addToMyBeers');
    $scope.cardSwiped(index);
    expect(BeerFactory.addToMyBeers).toHaveBeenCalled();
  });
  it('should call the BeerFactory\'s sendRating method when cardSwiped is called', function() {
    var beerReview = 1;
    spyOn(BeerFactory, 'sendRating');
    $scope.cardSwiped();
    expect(BeerFactory.sendRating).toHaveBeenCalled();
  });
  it('should have a method passSelectedBeer', function() {
  	expect($scope.passSelectedBeer).toBeDefined();
  	expect(typeof $scope.passSelectedBeer).toBe('function');
    spyOn(BeerFactory, 'passSelectedBeer');
  });
  it('should call the BeerFactory\'s passSelectedBeer method when passSelectedBeer is called', function() {
    var index = 2;
    $scope.passSelectedBeer(index);
    expect(BeerFactory.passSelectedBeer).toHaveBeenCalled();
    spyOn(BeerFactory, 'passSelectedBeer');
    $scope.passSelectedBeer(index);
    expect(BeerFactory.passSelectedBeer).toHaveBeenCalled();
  });
   it('should have a method cardDestroyed', function() {
  	expect($scope.cardDestroyed).toBeDefined();
  	expect(typeof $scope.cardDestroyed).toBe('function');
  });
   it('should remove a beer from the queue when carDestroyed method is called', function() {
    var index = 1;
    $scope.cardDestroyed();
    expect($scope.cardDestroyed).toHaveBeenCalled();
    expect($scope.beers[index]).toBe(null);
   });
  it('uses the BeerFactory method beerRecQueue to get cards', function () {
  	expect($scope.cards.length).not.toBe(0);
  });
});