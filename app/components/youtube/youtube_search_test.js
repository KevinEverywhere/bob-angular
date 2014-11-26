'use strict';

describe('bobApp.youtube module', function() {
	beforeEach(module('bobApp.youtube'));
		describe('YouTubeSearchController controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('YouTubeSearchController', {$scope:scope});
				expect(scope.name).toBe("YouTubeSearchController");
			}));
			it('should have an init function', inject(function($controller) {
				var scope = {},
				ctrl = $controller('YouTubeSearchController', {$scope:scope});
				expect(scope.init).toBeDefined();
			}));
	});
});