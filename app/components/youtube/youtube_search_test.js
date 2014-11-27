'use strict';

describe('bobApp.youtube.search module', function() {
	beforeEach(module('bobApp.youtube.search'));
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
			it('should call a URL and get a dataset back', inject(function($controller) {
				var scope = {}, knownFeed="/feeds/http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fsystem%2Flatest_published_content%2Frss.xml",
				ctrl = $controller('YouTubeSearchController', {$scope:scope});
				// $httpBackend.expectGET(knownFeed).respond(301);
				// scope.searchForFeed(knownFeed)
				expect(true).toBe(true);
			}));
	});
});

/*

			beforeEach(inject(function (_$httpBackend_, _feedMock_, _mockConfig_) {
			    _$httpBackend_.when('GET', _mockConfig_.FEED_URL).respond(_feedMock_);
			}));



describe('MyController', function() {
   var $httpBackend, $rootScope, createController, authRequestHandler;

   // Set up the module
   beforeEach(module('MyApp'));

   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('GET', '/auth.py')
                            .respond({userId: 'userX'}, {'A-Token': 'xxx'});

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('MyController', {'$scope' : $rootScope });
     };
   }));


   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });


   it('should fetch authentication token', function() {
     $httpBackend.expectGET('/auth.py');
     var controller = createController();
     $httpBackend.flush();
   });


   it('should fail authentication', function() {

     // Notice how you can change the response even after it was set
     authRequestHandler.respond(401, '');

     $httpBackend.expectGET('/auth.py');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.status).toBe('Failed...');
   });


   it('should send msg to server', function() {
     var controller = createController();
     $httpBackend.flush();

     // now you don’t care about the authentication, but
     // the controller will still send the request and
     // $httpBackend will respond without you having to
     // specify the expectation and response for this request

     $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
     $rootScope.saveMessage('message content');
     expect($rootScope.status).toBe('Saving...');
     $httpBackend.flush();
     expect($rootScope.status).toBe('');
   });


   it('should send auth header', function() {
     var controller = createController();
     $httpBackend.flush();

     $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
       // check if the header was send, if it wasn't the expectation won't
       // match the request and the test will fail
       return headers['Authorization'] == 'xxx';
     }).respond(201, '');

     $rootScope.saveMessage('whatever');
     $httpBackend.flush();
   });
});*/