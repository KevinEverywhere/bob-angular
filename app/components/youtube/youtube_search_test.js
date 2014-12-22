'use strict';

describe('bobApp.youtube.search module', function() {
	var ctrl;
	beforeEach(module('bobApp.youtube.search', 'youtube_search_sample'));
	beforeEach(inject(function(
		$http, $controller, $location, $httpBackend, $window, 
		$rootScope, $state, $stateParams, YouTubeSearchService, 
		threeCSSService, $timeout, defaultJSON){
			this.$scope=$rootScope.$new();
			this.$location=$location;
			this.$httpBackend=$httpBackend;
			this.controller=$controller("YouTubeSearchController",{
				$scope:this.$scope,
				$window:$window, 
				$rootScope:$rootScope,
				$state:$state, 
				$stateParams:$stateParams,
				_service:YouTubeSearchService, 
				threeCSSService:threeCSSService, 
				$timeout:$timeout
			});
		})
	);
	describe('YouTubeSearchController controller', function(){
		it('should have the right name', function($) {
			expect(this.$scope.name).toBe("YouTubeSearchController");
		});
		it('should have an init function', function(){
			expect(this.$scope.init).toBeDefined();
		});
		it('should call a URL and get a dataset back', 
			inject(function($controller, YouTubeSearchService, $http, $httpBackend, defaultJSON) {
				$httpBackend.expectGET(fullString).respond(defaultJSON);
				var beginString='https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=select%20*%20from%20youtube.search%20where%20query%3D"',
				endString='"&callback=', searchTerm="Kings of Leon";
				var fullString=beginString + searchTerm + endString;
				expect(defaultJSON.query.results.video.length).toBeGreaterThan(3);
				expect(defaultJSON.query.results.video[0].title.toLowerCase()).toContain(searchTerm.toLowerCase());
			})
		);
	});
});
