'use strict';

describe('bobApp.context module', function() {
	beforeEach(module('bobApp.context'));
		describe('ThreeContextController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope.name).toBe("ThreeContextController");
			}));
			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));
			it('should have one activeAnimation', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope.activeAnimations.length).toBe(1);
			}));
			it('should have one activeAnimation function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope[scope.activeAnimations[0]]).toBeDefined();
			}));
			it('should have a currentPosition greater than its minPosition', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope.currentPosition).toBeGreaterThan(scope.minPosition);
			}));
			it('should have a currentPosition less than its maxPosition', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope.currentPosition).toBeLessThan(scope.maxPosition);
			}));
	});
});
