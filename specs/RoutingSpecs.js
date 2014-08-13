

describe('Routing', function() {
	var $state;
	// beforeEach(module('ui.router'));
	// beforeEach(module('app'));

	// beforeEach(inject(function($injector) {
	// 	$state = $injector.get('$state');
	// }))

	it('Should have /swipe state, template, and controller', function() {
		expect($state.states['']).to.be.ok();
		expect($state.states['/swipe'].controller).to.be('CardsCtrl');
		expect($state.states['/swipe'].templateUrl).to.be('app/swipe/swipe.html');
	});

	it('Should have /mybeers state, template, and controller', function() {
		expect($state.states['/mybeers']).to.be.ok();
		expect($state.states['/mybeers'].controller).to.be('MyBeersCtrl');
		expect($state.states['mybeers'].templateUrl).to.be('app/mybeers/mybeers.html');
	});

	it('Should have /recommend state, template, and controller', function() {
		expect($state.states['/recommend']).to.be.ok();
		expect($state.states['/recommend'].controller).to.be('RecommendationCtrl');
		expect($state.states['/recommend'].templateUrl).to.be('app/recommend/recommend.html');
	});
});