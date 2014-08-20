describe('BeerFactory Service', function() {
	var $scope, $rootScope, $window, $httpBackend, BeerFactory;

	//use mocks to retrieve dependencies
	beforeEach(module('app'));
	beforeEach(module('app.services'));
	beforeEach(inject(function($injector) {
	 // Setup Angular Vars
    var $compile    = _$compile_;
    var $rootScope  = _$rootScope_;
    $scope          = $rootScope.$new();
    $httpBackend    = _$httpBackend_;
    $location       = _$location_;
		
	}));

	

});