'use strict';

describe('bobApp.footer module', function() {
	beforeEach(module('bobApp.footer'));
		describe('ThreeFooterController  controller', function(){
			it('should have the right name', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				expect(scope.name).toBe("ThreeFooterController");
			})
		);
	});
});