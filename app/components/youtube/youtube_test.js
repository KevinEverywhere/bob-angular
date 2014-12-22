'use strict';

describe('bobApp.youtube module', function() {
	beforeEach(module('bobApp.youtube'));
		describe('ThreeYouTubeController controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeYouTubeController', {$scope:scope});
				expect(scope.name).toBe("ThreeYouTubeController");
			}));
			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeYouTubeController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));
			it('should load into a 3D element', inject(function($controller) {
				var scope = {unitTestPass:"pending"},
				ctrl = $controller('ThreeYouTubeController', {$scope:scope});
				scope.init('youtube','content','ytContext');
				expect(scope.css3DObject.unitTestPass).toBe(true);
			}));
			it('progress from init to startMedia', inject(function($controller, $window) {
				var scope = {_height:300,_width:480},
				ctrl = $controller('ThreeYouTubeController', {$scope:scope});
				scope.init();
				expect($window.Player).toBe("Connected for unit testing.");
			}));
	});
});