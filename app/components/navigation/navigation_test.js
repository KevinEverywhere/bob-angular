'use strict';

describe('bobApp.navigation module', function() {
	beforeEach(module('bobApp.navigation'));
		describe('ThreeNavController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeNavController', {$scope:scope});
				expect(scope.name).toBe("ThreeNavController");
			})
		);
	});
});