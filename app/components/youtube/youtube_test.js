'use strict';

describe('bobApp.youtube module', function() {
	beforeEach(module('bobApp.youtube'));
		describe('ThreeYouTubeController controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeYouTubeController', {$scope:scope});
				expect(scope.name).toBe("ThreeYouTubeController");
			})
		);
	});
});