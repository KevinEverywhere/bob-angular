'use strict';

angular.module('bobApp.youtube', ["bobApp"])

	.service("YouTubeService",['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
			var _service={
				feedStart:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20youtube.search%20where%20query%3D%22",
				feedEnd:"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK",
				query:["query","results","video"],
				returnObj:null,
				videoWrapper:function(id, _width, _height){
					return('<iframe title="YouTube video player" width="'+_width+'" height="'+_height+
						'" src="http://www.youtube.com/embed/'+id + 
						'?hd=1&html5=1&autoplay=1" autoplay frameborder="0" allowfullscreen></iframe>');
				},
				searchVideos:function(searchTerm){
					// fields
				}
			}
			return _service;
		}
	])

	.controller('ThreeYouTubeController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$timeout",
		function ThreeYouTubeController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $timeout) {
			$scope.name='ThreeYouTubeController';
			$scope._position={
				z:100
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(200),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.activeAnimations=["animate"];
			$scope.activeParams={};
			$scope.count=0;
			$scope.youtubeId="RF0HhrwIwp0";
			$scope.youtubeURL="";
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=199;
			$scope.maxRotate=200;
			$scope.minRotate=160;

			$scope.init=function(elem, _content){
				$scope.youtubeURL="http://www.youtube.com/embed/" + $scope.youtubeId + "?autoplay=1&autostart=1&";
				if(!this.isInited){
					threeCSSService.init(elem, $scope, _content);
					this.isInited=true;
					render();
					try{
						$scope.startMedia("RF0HhrwIwp0");
					}catch(oops){
						$timeout(function(){$scope.startMedia("RF0HhrwIwp0");},1000)
					}
				}
			}
			$scope.startMedia=function(which){
			  var player = new $window.YT.Player('ytplayer', {
			      height: $scope._height,
			      width: $scope._width,
			      videoId: which
			    });
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
	/*
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



	.directive( "youTubeSearch", [function( searchTerm ) {
	])

	.directive( "youTubeViewer", [function( youtubeId ) {
    return {

		handleClientLoad:function() {
			gapi.client.setApiKey(apiKey);
			gapi.client.load('youtube', 'v3', loadPlaylist);
		},

		loadPlaylist:function() {
			requestVideoPlaylist("UU2SIfmttUkqIHbn_DBLSygw");
			// PL51DF3E41144EE869 PL5080DB2DA76A9CFE
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
	  
			  link: function( scope, element, attrs, gapi ) {
				element.bind( "click", function() {
				 Book.addBook( { title: "Star Wars", author: "George Lucas" } );
			   });
			 }
		   }
		}]
		)

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



*/

