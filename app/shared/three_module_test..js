'use strict';

describe('threeModule module', function() {
	beforeEach(module('threeModule'));
		describe('threeCSSService  service', function(){
			it('should have the right name', inject(function($service) {
				var scope = {},
				svc = $service('threeCSSService');
				expect(svc.isInitted).toBe(false);
			})
		);
	});
});
