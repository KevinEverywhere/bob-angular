'use strict';

angular.module('bobApp.youtube.search', ["bobApp", "bobApp.youtube"])
	.service("YouTubeSearchService",['$rootScope', "$http", "$httpBackend", "$q", "$state", "$window",
		 function($rootScope, $http, $httpBackend, $q, $state, $window) {
			var _service={
				init:function(){

				},
				searchForFeed:function(feed, callback, scope, tester){
					var passed=false;
					console.log("searchForFeed:function("+feed+", "+callback+", scope)")
					$http.get(feed)
					.success(function(data, status, headers, config) {
						passed=true;
						console.log("callback=" + callback)
						// scope.articles=data.articles;
						console.log(data);
						return passed;
					})
					.error(function(data, status, headers, config) {
						passed=false;
						console.log('error=' + data);
						return passed;
					});
					// nothing
				}
				/*
					query:["query","results","video"],
					apiKey:"AIzaSyA-pLtbyLpZuLivlcOZSIq54horCyM8FlU",
					returnObj:null,
					handleClientLoad:function() {
						gapi.client.setApiKey(this.apiKey);
						gapi.client.load('youtube', 'v3', loadPlaylist);
					},
					loadPlaylist:function() {
						this.requestVideoPlaylist("UU2SIfmttUkqIHbn_DBLSygw");
						// PL51DF3E41144EE869 PL5080DB2DA76A9CFE
					},
					requestVideoPlaylist:function(playlistId, pageToken) {
						var elem=$('#video-container')
						elem.html('');
						var requestOptions = {
							playlistId: playlistId,
							part: 'snippet',
							maxResults: 10
						};
						if (pageToken) {
							requestOptions.pageToken = pageToken;
						}
						var request = gapi.client.youtube.playlistItems.list(requestOptions);
						request.execute(function(response) {
						// Only show pagination buttons if there is a pagination token for the
						// next or previous page of results.
						nextPageToken = response.result.nextPageToken;
						var nextVis = nextPageToken ? 'visible' : 'hidden';
						$('#next-button').css('visibility', nextVis);
						prevPageToken = response.result.prevPageToken
						var prevVis = prevPageToken ? 'visible' : 'hidden';
						$('#prev-button').css('visibility', prevVis);
						var playlistItems = response.result.items;
						if (playlistItems) {
						$.each(playlistItems, function(index, item) {
						displayResult(item.snippet);
						});
						} else {
						elem.html('Sorry you have no uploaded videos');
						}
						});
					},
					displayResult:function(videoSnippet) {
					  var title = videoSnippet.title;
					  var videoId = videoSnippet.resourceId.videoId;
					  $('#list-container').append('<li><a href="' + "javascript:selectVideo('" + videoId +"')" + '">' + title + '</a></li>');
					},
					nextPage:function() {
					  requestVideoPlaylist(playlistId, nextPageToken);
					},
					previousPage:function() {
					  requestVideoPlaylist(playlistId, prevPageToken);
					},
					selectVideo:function(id){
						$('#video-container').html(videoWrapper(id));
					},
					videoWrapper:function(id, _width, _height){
						return('<iframe title="YouTube video player" width="'+_width+'" height="'+_height+
							'" src="http://www.youtube.com/embed/'+id + 
							'?hd=1&html5=1&autoplay=1" autoplay frameborder="0" allowfullscreen></iframe>');
					},
					searchVideos:function(searchTerm){
					$.ajax( { 
						url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20youtube.search%20where%20query%3D%22eminem%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&",
						type: 'POST', 
						dataType: 'jsonp',
						success: function(data) {
							window.theData=data.query.results.video;
							init();
							animate();
						},
						error: function() {
							console.log("ujojo");
						}
					})
						// fields
					}
				*/
			}
			return _service;
		}
	])

	.controller('YouTubeSearchController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "YouTubeSearchService", "threeCSSService", "$timeout",
		function YouTubeSearchController($window, $scope, $rootScope, $state, $stateParams, YouTubeSearchService, threeCSSService, $timeout) {
			$scope._service=YouTubeSearchService;
			$scope.name='YouTubeSearchController';
			$scope._position={
				z:20
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(200),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope.count=0;
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=199;
			$scope.maxRotate=200;
			$scope.minRotate=160;

			$scope.init=function(elem, _content, _context){
			//	$rootScope._context=$("#"+ _context).html();
			//	if(!this.isInited){
			//		threeCSSService.init(elem, $scope, _content);
			//		this.isInited=true;
			//		render();
			//	}
			}
			$scope.searchForFeed=function(feed, callback){
				console.log("controller.searchForFeed=" + feed);
				return $scope._service.searchForFeed(feed, callback, $scope);
				console.log("controller.afTER=");
			}
			$scope.animate=function(){
				$scope.currentRotate+=($scope._dir * $scope.incr);
				if($scope.currentRotate<$scope.maxRotate){
					if($scope.currentRotate<$scope.minRotate){
						$scope._dir=-$scope._dir;
						$scope.currentRotate+=$scope._dir;
					}
				}else{
					$scope._dir=-$scope._dir;
					$scope.currentRotate+=$scope._dir;
				}
				$scope.css3DObject.rotation.y=threeCSSService.radianCalculator($scope.currentRotate)
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr * 10);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])

	.directive( "threeYouTube", [function( ) {
		var threeObj = {
			restrict: 'EA',
			replace:false,
	        transclude: true,
			scope: true,
			controller: "ThreeYouTubeController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='threeYouTube'></div>"
		};
		return threeObj;
	}
	])


	.directive( "youTubeSearch", [function() {
		var threeObj = {
			restrict: 'EA',
			replace:false,
	        transclude: true,
			scope: true,
			controller: "YouTubeSearchController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			templateURL: "youtube_search.html"
		};
		return threeObj;
	}]);

	/*

'use strict';

angular.module('bobApp.youtube', ["bobApp"])

	.service("YouTubeService",['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
			var _service={
				feedStart:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20youtube.search%20where%20query%3D%22",
				feedEnd:"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK",
				query:["query","results","video"],
				returnObj:null,
				searchVideos:function(searchTerm){
					fields
				}
			}
			return _service;
		}
	])

	.controller('YouTubeCtrl', ["$rootScope", "$scope", 
		function YouTubeCtrl($rootScope, $scope) {
		// footer
		}
	]);


	.controller('ThreeYouTubeController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$timeout",
		function ThreeYouTubeController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $timeout) {
			$scope.name='ThreeYouTubeController';
			$scope._position={
				z:20
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(200),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope.count=0;
			$scope.youtubeId="afBm0Dpfj_k";// "Pkaq0_qOx0E" "RF0HhrwIwp0"; 
			$scope.youtubeURL="";
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=199;
			$scope.maxRotate=200;
			$scope.minRotate=160;

			$scope.init=function(elem, _content, _context){
				$scope.youtubeURL="http://www.youtube.com/embed/" + $scope.youtubeId + "?autoplay=1&html5=1&autostart=1&enablejsapi=1&";
				$rootScope._context=$("#"+ _context).html();
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					render();
					try{
						$scope.startMedia($scope.youtubeId);
					}catch(oops){
						$timeout(function(){$scope.startMedia($scope.youtubeId);},1000)
					}
				}
			}
			$scope.startMedia=function(which){
				var me=$scope;
				$scope.player = new $window.YT.Player('ytplayer', {
			      height: $scope._height,
			      width: $scope._width,
			      videoId: which  + "?autoplay=1&html5=1&autostart=1&enablejsapi=1&",
                events: {
                        'onReady': me.onPlayerReady,
                        'onStateChange': me.onPlayerStateChange
                }});
			    /*
    function onYouTubePlayerReady(playerId) {
      ytplayer = document.getElementById("myytplayer");
    }

			    $scope.player.
			    * /
			}
			$scope.onPlayerReady=function(evt){
				console.log("onPlayerReady=" + evt);
			}
			$scope.onPlayerStateChange=function(evt){
				console.log("onPlayerStateChange=" + evt);
			}
			$scope.animate=function(){
				try{console.log("$scope.player.currentTime=" + $scope.player.currentTime);}catch(oops){console.log("no available test")}
				$scope.currentRotate+=($scope._dir * $scope.incr);
				if($scope.currentRotate<$scope.maxRotate){
					if($scope.currentRotate<$scope.minRotate){
						$scope._dir=-$scope._dir;
						$scope.currentRotate+=$scope._dir;
					}
				}else{
					$scope._dir=-$scope._dir;
					$scope.currentRotate+=$scope._dir;
				}
				$scope.css3DObject.rotation.y=threeCSSService.radianCalculator($scope.currentRotate)
				$scope.css3DObject.position.z=$scope.css3DObject.position.z + ($scope._dir * $scope.incr * 10);
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	])

	.directive( "threeYouTube", [function( ) {
		var threeObj = {
			restrict: 'EA',
			replace:false,
	        transclude: true,
			scope: true,
			controller: "ThreeYouTubeController",
			_scope: {
				"id":"@",
				"eventHandler": '&ngClick'
			},
			template: "<div class='threeYouTube'></div>"
		};
		return threeObj;
	}
	]);


handleClientLoad displayResult

*/




