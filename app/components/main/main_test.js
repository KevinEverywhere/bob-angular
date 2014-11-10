'use strict';

describe('bobApp.main module', function() {
	beforeEach(module('bobApp.main'));
		describe('ThreeCSSController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeCSSController', {$scope:scope});
				expect(scope.name).toBe("ThreeCSSController");
			}));
			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeCSSController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));
			it('should not yet have an isInited value', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeCSSController', {$scope:scope});
				expect(scope.isInited).toBeFalsy();
			}));
	});
});