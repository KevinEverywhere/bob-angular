'use strict';

describe('bobApp.leaflet module', function() {
	beforeEach(module('bobApp.leaflet'));
		describe('ThreeLeafletController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				expect(scope.name).toBe("ThreeLeafletController");
			}));
			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));
	});
});