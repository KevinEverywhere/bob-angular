'use strict';

describe('bobApp.svg module', function() {
	beforeEach(module('bobApp.svg'));
		describe('ThreeSVGController controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeSVGController', {$scope:scope});
				expect(scope.name).toBe("ThreeSVGController");
			}));
			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeSVGController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));
	});
});