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
			it('should call a URL and get a dataset back', inject(function($controller) {
				var scope = {},
				ctrl = $controller('ThreeFooterController', {$scope:scope});
				/*
				$httpBackend.expectGET($scope.newsFeedURL).respond({
					data:true
				});
				*/
				scope.init("This tests for", "feed call", true);
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
