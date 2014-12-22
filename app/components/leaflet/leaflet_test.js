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
			it('should have one activeAnimation', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				expect(scope.activeAnimations.length).toBe(1);
			}));
			it('should have one activeAnimation function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				expect(scope[scope.activeAnimations[0]]).toBeDefined();
			}));

			it('should have a currentRotate smaller than its maxRotate', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				expect(scope.currentRotate).toBeLessThan(scope.maxRotate);
			}));
			it('should have a currentRotate larger than its minRotate', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				expect(scope.currentRotate).toBeGreaterThan(scope.minRotate);
			}));
			it('should load into a 3D element', inject(function($controller){
				var scope={unitTestPass:"pending"},
				ctrl = $controller('ThreeLeafletController', {$scope:scope});
				scope.init('leaflet','content','leafletMap','leafletContext');
				expect(scope.css3DObject.unitTestPass).toBe(true);
			}));
	});
});

