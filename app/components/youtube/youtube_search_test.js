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
   //   this.defaultJSON=youtube_search_sample.defaultJSON;
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
    }));
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
          var fullString=beginString + searchTerm + endString,
          callback=function(){
            expect(defaultJSON.query.results.video.length).toBeGreaterThan(1);
            expect(defaultJSON.query.results.video[0].title.toLowerCase()).toContain(searchTerm.toLowerCase());
            console.log("defaultJSON-" + defaultJSON);
            YouTubeSearchService.findVideos(searchTerm, this.$scope, callback);
            $httpBackend.flush();
          };

   //       $httpBackend.flush();


/*


        console.log(this.controller.scope._service + " = this.controller.scope._service; defaultJSON.video.length=" + defaultJSON.query.results.video.length);
        $http.get(_callback)
          .success(function(data) {
            console.log("successdata=" + data);
            $httpBackend.whenJSONP(knownURL).respond(data);
            var test=$http.jsonp(knownURL);
            console.log("$http.jsonp(knownURL)=" + test);
            expect(test.query).toBeDefined();
            $httpBackend.flush();
          })
          .error(function(data, status, headers, config) {console.log("boo boo")}).
          then(function(data){console.log("data=" + data)});

          */
  }));

});

});

/*
1494b1c8-dab6-43a8-a415-f4ffa472df6e
youtube_search_sample
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