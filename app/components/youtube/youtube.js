'use strict';

angular.module('bobApp.youtube', ["bobApp"])
	.service("YouTubeService",['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
			var _service={
				currentPosition:0,
				currentMedia:"",
				activePlayer:null,
				feedStart:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20youtube.search%20where%20query%3D%22",
				feedEnd:"%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK",
				query:["query","results","video"],
				returnObj:null,
				youTubeController:null,
				timer:function(){
					try{
						if(_service.player && _service.player.getCurrentTime()>0){
							_service.currentPosition=$rootScope.currentPosition=_service.player.getCurrentTime();
						}
					}catch(oops){
					}
				},
				startMedia:function(which, obj){
					if(!which){
						$window.Player="Connected for unit testing.";
					}else{
						if((_service.currentMedia==which) && (_service.currentPosition!=0)){
							//
						}else{
							_service.currentMedia=which;
							_service.currentPosition=0;
						}
						var me=obj;
			//			if(me.player && ($state.$current.indexOf("video") != -1)){
						if(me.player && $state.$current != "video"){
							me.player.loadVideoById(which);
							me.player.seekTo(_service.currentPosition);
						}else{
							me.player = new $window.YT.Player('ytplayer', {
								height: _service.activePlayer.height,
								width: _service.activePlayer.width,
								videoId: which + "?autoplay=1&html5=1&autostart=1&enablejsapi=1&",
								events: {
									'onReady': me.onPlayerReady,
									'onStateChange': me.onPlayerStateChange
								}
							});
						}
						$window.Player=me.player;
					}
				},
				onPlayerReady:function(evt){
					$window.player=evt.target;
					try{
						console.log("_service.currentPosition=" + _service.currentPosition);
						if(_service.currentPosition!=0){
							_service.player.seekTo(_service.currentPosition);
						}
					}catch(oops){
						console.log("onPlayerReady=" + evt);
					}
				},
				onPlayerStateChange:function(evt){
					if(_service.player.getPlayerState()==2){
						if($state.$current.name=="videofeed.videofeed.index"){
							_service.currentPosition=0;
							$rootScope.$broadcast("incrementCurrentVideo");
						}
					}
				}
			}
			return _service;
		}
	])
	.controller('ThreeYouTubeController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$timeout", "YouTubeSearchService",  "YouTubeService",
		function ThreeYouTubeController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $timeout, YouTubeSearchService, YouTubeService) {
			$scope.name='ThreeYouTubeController';
			$scope._position={
				z:20
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(200),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.activeAnimations=["animate","timer"];
			$scope.activeParams={};
			$scope.count=0;
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=199;
			$scope.maxRotate=200;
			$scope.minRotate=160;
			$scope.control=this;

			$scope.startMedia=function(which){
				if(!which){
					YouTubeService.startMedia(false, YouTubeService);
				}else{
					YouTubeService.activePlayer={
				      height: $scope._height,
				      width: $scope._width};
					YouTubeService.startMedia(which, YouTubeService);
				}
			}

			$scope.init=function(elem, _content, _context){
				if(!elem){
					$scope.startMedia(false);
				}else{
					if(!this.isInited){
						YouTubeService.youTubeController=this;
						if((YouTubeService.currentMedia=="") &&(YouTubeService.currentPosition==0)) {
							if($rootScope.youtubeid){
								$scope.youtubeid=$rootScope.youtubeid;
							}else{
								$scope.youtubeid= $scope.youtubeid || $stateParams.youtubeid || "afBm0Dpfj_k";
							}
						}else{
							$scope.youtubeid=YouTubeService.currentMedia; 							
						}
						threeCSSService.init(elem, $scope, _content, _context);
						this.isInited=true;
						try{
							render();
							try{
								$scope.startMedia($scope.youtubeid);
							}catch(oops){
								$timeout(function(){$scope.startMedia($scope.youtubeid);},1000)
							}
						}catch(oops){
							console.log("youtube.js rendering bypassed for unit tests.")
						}							
					}
				}
			}
			$scope.timer=function(){
				YouTubeService.timer();
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
	]);