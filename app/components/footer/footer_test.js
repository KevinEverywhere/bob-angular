'use strict';

describe('bobApp.footer module', function() {
	beforeEach(module('bobApp.footer'));
		describe('ThreeFooterController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope.name).toBe("ThreeFooterController");
			}));

			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));

			it('should make room to fit articles', inject(function($controller){
				var scope={},
				ctrl=$controller('ThreeFooterController', {$scope:scope});
				scope._width=640;
				scope.makeScrollFit(5);
				expect(scope.minMove).toBe(-960);
			}));
			it('should load into a 3D element', inject(function($controller) {
				var scope = {unitTestPass:"pending"},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				scope.init('footer','footcontent');
				expect(scope.css3DObject.unitTestPass).toBe(true);
			}));
			it('should have one activeAnimation', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope.activeAnimations.length).toBe(1);
			}));
			it('should have one activeAnimation function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope[scope.activeAnimations[0]]).toBeDefined();
			}));

			it('should have a currentMove of null', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope.currentMove).toBeNull();
			}));

			it('should have a maxMove greater than its minMove', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope.maxMove).toBeGreaterThan(scope.minMove);
			}));

	});
});
