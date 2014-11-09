'use strict';

describe('bobApp.context module', function() {
	beforeEach(module('bobApp.context'));
		describe('ThreeContextController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeContextController', {$scope:scope});
				expect(scope.name).toBe("ThreeContextController");
			})
		);
	});
});