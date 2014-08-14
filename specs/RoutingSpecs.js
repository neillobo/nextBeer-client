'use strict';

describe('Routing', function() {
	var $state;
	// beforeEach(module('ui.router'));
	beforeEach(module('app'));

	beforeEach(inject(function($injector) {
		$state = $injector.get('$state');
	}))

	it('Should have /swipe state, template, and controller', function() {
		expect($state.states['app/swipe']).toBeDefined();
		expect($state.states['/swipe'].controller).toBe('CardsCtrl');
		expect($state.states['/swipe'].templateUrl).toBe('app/swipe/swipe.html');
	});

	it('Should have /mybeers state, template, and controller', function() {
		expect($state.states['/mybeers']).toBeDefined();
		expect($state.states['/mybeers'].controller).to.be('MyBeersCtrl');
		expect($state.states['mybeers'].templateUrl).to.be('app/mybeers/mybeers.html');
	});

	it('Should have /recommend state, template, and controller', function() {
		expect($state.states['/recommend']).toBeDefined();
		expect($state.states['/recommend'].controller).to.be('recommendationCtrl');
		expect($state.states['/recommend'].templateUrl).to.be('app/recommend/recommend.html');
	});
});

