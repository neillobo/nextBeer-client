'use strict';
 
describe('Controller: MyBeersCtrl', function () {

  var $rootScope, $state, $location, $injector, myFactoryMock, state = 'app';
 
   beforeEach(function() {

    module('app', function($provide) {
      $provide.value('BeerFactory', myFactoryMock = {});
    });

    inject(function(_$rootScope_, _$controller_, _$location_, _$state_, _$injector_, $templateCache) {
      $rootScope = _$rootScope_;
      $state = _$state_;
      $injector = _$injector_;
      $location = _$location_;

      $templateCache.put('app/mybeers/mybeers.html', '');
      // var scope = _$rootScope_.$new();
      // MyBeersCtrl = _$controller_('MyBeersCtrl', {
      //   $scope: scope
      // });
      // $httpBackend = $injector.get('$httpBackend');
      // $httpBackend.whenGET('http://next-beer.herokuapp.com/api/v2/user').passThrough();
    })
  });

  it('should respond to URL', function() {
    expect($state.href('app.mybeers')).toEqual('#/app/mybeers');
  });
 
  // Expected '#/app' to equal '#/state/mybeers'.

  // Initialize the controller and a mock scope

  it('should transition to app.mybeers', (function () {
    $location.path('/#/app/mybeers');
    expect($state.current.name).toBe('app.mybeers');
  }));
});