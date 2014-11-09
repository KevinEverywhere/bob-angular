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
				// scope.newsFeedURL="assets/js/test_article.json";
				scope._width=640;
				scope.makeScrollFit(5);
				expect(scope.minMove).toBe(-960);
			})
			)
	});
});
