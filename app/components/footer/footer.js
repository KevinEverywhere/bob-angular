'use strict';

angular.module('bobApp.footer', ["bobApp", "threeModule", "ngRoute", "ui.router"])
	.controller('ThreeFooterController', ["$window", "$scope", "$rootScope", "$state", "$stateParams", "threeCSSService", "$http", "$httpBackend", 
		function ThreeFooterController($window, $scope, $rootScope, $state, $stateParams, threeCSSService, $http, $httpBackend) {
			$scope.name='ThreeFooterController';
			$scope.newsFeedURL="http://api.feedzilla.com/v1/categories/19/articles.json"; // A sample world news feed.
			$scope.feedItems=[];
			$scope.activeAnimations=['animate'];
			$scope.activeParams={};
			$scope.navs = {};
			$scope._dir=-1;
			$scope.incr=.5;
			$scope.feedItemWidth=320;
			$scope.currentMove=null;
			$scope.maxMove=0;
			$scope.minMove=-3800;
			$scope._position={
				z:2,
				y:30
			};
			$scope._rotation={
				x:threeCSSService.radianCalculator(1.3),
				y:threeCSSService.radianCalculator(180),
				z:threeCSSService.radianCalculator(180)
			};
			$scope.makeScrollFit=function(howMany){
				$scope.maxMove=$scope._width;
				$scope.minMove=$scope._width-($scope.feedItemWidth * howMany);
			};
			$scope.init=function(elem, _content, toTest){
				var me=$scope;
				if(!toTest && !$scope.unitTestPass){
					$http({method: 'GET', url: $scope.newsFeedURL})
					.success(function(data, status, headers, config) {
						if(!me.isInited){
							$scope.articles=data.articles;
							threeCSSService.init(elem, me, _content);
							me.isInited=true;
							try{
								me.makeScrollFit(data.articles.length);
								render();
							}catch(oops){
								console.log("footer.js rendering bypassed for unit tests.")
							}
						}
					})
					.error(function(data, status, headers, config) {
						console.log('error=' + data);
					});
				}else{
					console.log("BYPassing ");
					threeCSSService.init(elem, me, _content);
					// $httpBackend.expectGET($scope.newsFeedURL).respond({ data:true });
				}
			}
			$scope.animate=function(){
				$scope.currentMove= ($scope.currentMove==null) ? $scope.maxMove : $scope.currentMove+($scope._dir * $scope.incr);
				if($scope.currentMove<$scope.minMove){
					$scope.currentMove=$scope.maxMove;
				}
				$scope.css3DObject.position.x=$scope.currentMove;
				$scope.renderer.render($scope.scene, $scope.camera);
			}
			var render=function() {
				$scope.renderer.render($scope.scene, $scope.camera);
				threeCSSService.render($scope);
			}
		}
	]);