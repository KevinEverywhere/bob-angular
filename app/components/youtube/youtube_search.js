'use strict';

angular.module('bobApp.youtube.search', ["bobApp", "bobApp.youtube"])
	.service("YouTubeSearchService",['$rootScope', "$http", "$httpBackend", "$q","$stateParams", "$state", "$window", "$timeout", "YouTubeService", "threeCSSService",
		 function($rootScope, $http, $httpBackend, $q, $stateParams, $state, $window, $timeout, YouTubeService, threeCSSService) {
			var _service={
				videos:[],
				init:function(_context){
					$window.updateFormFieldHints();
					this._context=_context;
				},
				render:function(scopeArg) {
					scopeArg.renderer.render(scopeArg.scene, scopeArg.camera);
					threeCSSService.render(scopeArg);
				},
				search_update:function(data, scope){
					scope.currentData=data;
					if(data!=null){
						try{
							_service.videos=data.query.results.video;
							_service.setCurrentVideo($stateParams.idx || 0, scope);
						}catch(oops){}
					}
					$timeout(function(){
						console.log("#timeout . fired=");
						
						console.log("#sectionBody=" + scope.getContextHTML());
						// 
						$("#sectionBody").html(scope.getContextHTML());
					}, 1000);
				},
				incrementCurrentVideo:function(){
					if(_service.currentVideo<_service.videos.length-1){
						$state.go("videofeed.videofeed.index",{idx:(_service.currentVideo * 1) + 1})
					}
				},
				currentVideo:-1,
				getCurrentVideo:function(){
					return (this.currentVideo!=-1) ? this.getVideo(this.currentVideo) : null;
				},
				setCurrentVideo:function(toWhat, scope){
					_service.currentVideo=toWhat;
					threeCSSService.init('youtubeSearch', scope, "content", scope._context);
					console.log('from currentVideo');
					_service.render(scope);
					YouTubeService.activePlayer={height: scope._height,width: scope._width};
					YouTubeService.startMedia(_service.videos[_service.currentVideo].id,YouTubeService);
				},
				getVideo:function(which){
					var rtn=null;
					for(var v in this.videos){
						if(this.videos[v].id==which){
							rtn=this.videos[v];
							break;
						}
					}
					rtn=this.videos[which];
					return rtn;
				},
				counter:0,
				maxCount:20,
				timeoutLength:1000,
				findVideos:function(searchTerm, scopeArg, callback){
					var  me=this, scope=scopeArg, beginString='https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=select%20*%20from%20youtube.search%20where%20query%3D"',
					endString='"&callback=';
					var fullString=beginString + searchTerm + endString;
					$http({method: 'GET', url: fullString}).
						success(function(data, status, headers, config) {
							if(data && data.query && data.query.results && data.query.results.video && data.query.results.video.length>0){
								scope.currentData=data;
								$rootScope.currentData=data;
								try{
									me.videos=data.query.results.video;
									callback();
								}
								catch(oops){}
								me.search_update(data, scope)
							}else{
								me.counter++;
								if(me.counter<me.maxCount){
									console.log("try #" + me.counter)
									$timeout(me.findVideos(searchTerm, scope, callback),me.timeoutLength + (me.count * 200));
								}else{
									console.log("too many tries")
								}
							}
						})
						.error(function(data, status, headers, config) {scope.currentData=null;});
				}
			}
			return _service;
		}
	])

	.controller('YouTubeSearchController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "YouTubeService", "YouTubeSearchService", "threeCSSService", "$timeout",
		function YouTubeSearchController($window, $scope, $rootScope, $state, $stateParams, YouTubeService, YouTubeSearchService, threeCSSService, $timeout) {
 			$scope.currentData=null;
			$scope._service=YouTubeSearchService;
			$scope.name='YouTubeSearchController';
			$scope.activeAnimations=["animate", "timer"];
			$scope.activeParams={};
			$scope._dir=-1;
			$scope.incr=.01;
			$scope.currentRotate=180;
			$scope.maxRotate=200;
			$scope.minRotate=160;
			$scope._position={
				x:($scope._width/4),
				y:0,
				z:-120
			};
			$scope._rotation={
				x:0,
				y:threeCSSService.radianCalculator(180),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.timer=function(){
				YouTubeService.timer();
			//	console.log("YouTubeService.timer(); called");
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
			$scope.setCurrentVideo=function(idx){
				YouTubeSearchService.setCurrentVideo(idx, $scope);
			}
			$scope.findVideos=function(searchTerm, callback){
				YouTubeSearchService.findVideos(searchTerm, this, callback);
			}
			$scope.getContextHTML=function(){
				return(this._context.html())
			}
			$scope.callback=function(){
				threeCSSService.init(
					this.elem,
					this._scope, 
					this._content);
				render();
			}
			$scope.setCallback=function(elem, _scope, _content){
				this.elem=elem;
				this._scope=_scope;
				this._content=_content;
			}
			$scope.control=this;
			$scope.init=function(elem, _content, _context){
				$scope.ytSearchText="Enter keyword";
				YouTubeSearchService.init(_context);
				this._context=$("#"+ _context);
				var me=this;
				if(!this.isInited){
					this.isInited=true;
					this.setCallback(elem, $scope, _content)
					var callback=function(){
						threeCSSService.init(elem, $scope, _content, _context);
					}
					if($stateParams && $stateParams.videofeed){
						this.findVideos($stateParams.videofeed, callback);
					}else{
						callback();
					}
				}
			}
			var render=function(scopeArg) {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	]);
